import { createHash } from 'node:crypto';

const hashToken = (token) => createHash('sha256').update(token).digest('hex');

export async function initializeAuth(db) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error(
      'Set JWT_SECRET to a random value of at least 32 characters.',
    );
  }
  await db.collection('accounts').createIndex({ email: 1 }, { unique: true });
  await db
    .collection('sessions')
    .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
  await db
    .collection('passwordResets')
    .createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
}

export function findActiveSession(db, token) {
  return db.collection('sessions').findOne({
    _id: hashToken(token),
    expiresAt: { $gt: new Date() },
  });
}

export function createSession(db, token, userId, expiresAt) {
  return db
    .collection('sessions')
    .insertOne({ _id: hashToken(token), userId, expiresAt });
}

export function deleteSession(db, token) {
  return db.collection('sessions').deleteOne({ _id: hashToken(token) });
}

export function deleteUserSessions(db, userId) {
  return db.collection('sessions').deleteMany({ userId });
}

export function createPasswordReset(db, token, userId, expiresAt) {
  return db
    .collection('passwordResets')
    .insertOne({ _id: hashToken(token), userId, expiresAt });
}

export function deletePasswordReset(db, token) {
  return db.collection('passwordResets').deleteOne({ _id: hashToken(token) });
}

// Atomic consumption preserves the existing single-use reset-token behavior.
export function consumePasswordReset(db, token) {
  return db.collection('passwordResets').findOneAndDelete({
    _id: hashToken(token),
    expiresAt: { $gt: new Date() },
  });
}

export function deleteUserPasswordResets(db, userId) {
  return db.collection('passwordResets').deleteMany({ userId });
}
