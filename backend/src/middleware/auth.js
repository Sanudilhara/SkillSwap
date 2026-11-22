import jwt from 'jsonwebtoken';
import * as accountModel from '../models/accountModel.js';
import * as authModel from '../models/authModel.js';

export function sessionToken(req) {
  return (req.headers.cookie || '')
    .split(';')
    .map((value) => value.trim())
    .find((value) => value.startsWith('skillswap_session='))
    ?.slice('skillswap_session='.length);
}

export async function authenticatedUser(req) {
  const token = sessionToken(req);
  const db = req.app.locals.db;
  if (!token || !db) return null;
  let claims;
  try {
    claims = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: 'skillswap',
      audience: 'skillswap-web',
    });
  } catch {
    return null;
  }
  const session = await authModel.findActiveSession(db, token);
  return session && claims.sub === session.userId.toString()
    ? accountModel.findById(db, session.userId)
    : null;
}

export async function requireAuth(req, res, next) {
  req.account = await authenticatedUser(req);
  if (!req.account)
    return res
      .status(401)
      .json({ error: 'Please log in to open your student portal.' });
  req.actorId = req.account._id.toString();
  req.db = req.app.locals.db;
  next();
}
