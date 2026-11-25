import { randomBytes, randomUUID, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import jwt from 'jsonwebtoken';
import * as accountModel from '../models/accountModel.js';
import * as authModel from '../models/authModel.js';
import { passwordFields, validPassword } from '../models/accountModel.js';
import { authenticatedUser, sessionToken } from '../middleware/auth.js';

const deriveKey = promisify(scrypt);
const lifetime = 7 * 24 * 60 * 60;
const publicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
});

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: lifetime * 1000,
  };
}

async function startSession(req, res, user) {
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    subject: user._id.toString(),
    jwtid: randomUUID(),
    issuer: 'skillswap',
    audience: 'skillswap-web',
    expiresIn: lifetime,
  });
  await authModel.createSession(
    req.app.locals.db,
    token,
    user._id,
    new Date(Date.now() + lifetime * 1000),
  );
  const previous = sessionToken(req);
  if (previous) await authModel.deleteSession(req.app.locals.db, previous);
  res.cookie('skillswap_session', token, cookieOptions());
}

export async function register(req, res) {
  const { fullName, email, password } = req.body || {};
  if (
    typeof fullName !== 'string' ||
    !fullName.trim() ||
    fullName.trim().length > 100 ||
    typeof email !== 'string' ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof password !== 'string' ||
    password.length < 8 ||
    password.length > 128
  ) {
    return res.status(400).json({
      error:
        'Enter your name, a valid email, and a password of 8–128 characters.',
    });
  }
  const user = {
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    ...(await passwordFields(password)),
    createdAt: new Date(),
  };
  try {
    const result = await accountModel.create(req.app.locals.db, user);
    user._id = result.insertedId;
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({
        error: 'An account with this email already exists. Please log in.',
      });
    throw error;
  }
  res.status(201).json({ user: publicUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body || {};
  if (
    typeof email !== 'string' ||
    email.length > 254 ||
    typeof password !== 'string' ||
    password.length > 128
  ) {
    return res
      .status(400)
      .json({ error: 'Enter your email address and password.' });
  }
  const user = await accountModel.findByEmail(
    req.app.locals.db,
    email.trim().toLowerCase(),
  );
  const key = await deriveKey(
    password,
    user?.salt || '00000000000000000000000000000000',
    64,
    { N: 32768, maxmem: 64 * 1024 * 1024 },
  );
  if (!user || !timingSafeEqual(key, Buffer.from(user.passwordHash, 'hex'))) {
    return res.status(401).json({ error: 'Email or password is incorrect.' });
  }
  await startSession(req, res, user);
  res.json({ user: publicUser(user) });
}

export async function getMe(req, res) {
  const user = await authenticatedUser(req);
  if (!user)
    return res
      .status(401)
      .json({ error: 'Please log in to view your account.' });
  res.json({ user: publicUser(user) });
}

export async function logout(req, res) {
  const token = sessionToken(req);
  if (token) await authModel.deleteSession(req.app.locals.db, token);
  const { maxAge, ...options } = cookieOptions();
  res.clearCookie('skillswap_session', options);
  res.json({ message: 'Logged out.' });
}

export async function changePassword(req, res) {
  const user = await authenticatedUser(req);
  if (!user) return res.status(401).json({ error: 'Please log in.' });
  const { currentPassword, password } = req.body || {};
  if (
    typeof password !== 'string' ||
    password.length < 8 ||
    password.length > 128
  )
    return res
      .status(400)
      .json({ error: 'Use a password of 8–128 characters.' });
  if (!(await validPassword(user, currentPassword)))
    return res
      .status(400)
      .json({ error: 'Your current password is incorrect.' });
  await accountModel.update(
    req.app.locals.db,
    user._id,
    await passwordFields(password),
  );
  await authModel.deleteUserSessions(req.app.locals.db, user._id);
  await authModel.deleteUserPasswordResets(req.app.locals.db, user._id);
  await startSession(req, res, user);
  res.json({
    message: 'Password updated. Other sessions have been signed out.',
  });
}

export async function forgotPassword(req, res) {
  const { email } = req.body || {};
  if (typeof email !== 'string' || email.length > 254)
    return res.status(400).json({ error: 'Enter a valid email address.' });
  const sendMail = req.app.locals.sendResetMail;
  if (!sendMail)
    return res.status(503).json({
      error:
        'Password recovery email is not configured yet. Please contact the platform administrator.',
    });
  const user = await accountModel.findByEmail(
    req.app.locals.db,
    email.trim().toLowerCase(),
  );
  if (user) {
    const token = randomBytes(32).toString('hex');
    const database = req.app.locals.db;
    await authModel.createPasswordReset(
      database,
      token,
      user._id,
      new Date(Date.now() + 30 * 60 * 1000),
    );
    try {
      await sendMail(
        user.email,
        `${process.env.APP_URL || 'http://127.0.0.1:5173'}/reset-password?token=${token}`,
      );
    } catch {
      await authModel.deletePasswordReset(database, token);
      return res.status(503).json({
        error: 'Email delivery is unavailable. Please try again later.',
      });
    }
  }
  res.json({
    message:
      'If that email belongs to an account, a reset link has been sent. It expires in 30 minutes.',
  });
}

export async function resetPassword(req, res) {
  const { token, password } = req.body || {};
  if (
    typeof token !== 'string' ||
    !/^[a-f0-9]{64}$/.test(token) ||
    typeof password !== 'string' ||
    password.length < 8 ||
    password.length > 128
  )
    return res.status(400).json({
      error: 'Use a valid reset link and a password of 8–128 characters.',
    });
  const database = req.app.locals.db;
  const fields = await passwordFields(password);
  const reset = await authModel.consumePasswordReset(database, token);
  if (!reset)
    return res.status(400).json({
      error: 'This reset link is invalid or expired. Request a new one.',
    });
  await accountModel.update(database, reset.userId, fields);
  await authModel.deleteUserSessions(database, reset.userId);
  await authModel.deleteUserPasswordResets(database, reset.userId);
  res.json({
    message: 'Password reset successfully. Log in with your new password.',
  });
}
