import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const deriveKey = promisify(scrypt);

export function findById(db, id) {
  return db.collection('accounts').findOne({ _id: id });
}

export function findByEmail(db, email) {
  return db.collection('accounts').findOne({ email });
}

export function create(db, account) {
  return db.collection('accounts').insertOne(account);
}

export function update(db, id, changes) {
  return db.collection('accounts').updateOne({ _id: id }, { $set: changes });
}

export function listStudentAccounts(db) {
  return db
    .collection('accounts')
    .find({}, { projection: { passwordHash: 0, salt: 0, email: 0 } })
    .toArray();
}

export async function passwordFields(password) {
  const salt = randomBytes(16).toString('hex');
  const key = await deriveKey(password, salt, 64, {
    N: 32768,
    maxmem: 64 * 1024 * 1024,
  });
  return { salt, passwordHash: key.toString('hex') };
}

export async function validPassword(user, password) {
  if (typeof password !== 'string' || password.length > 128) return false;
  const key = await deriveKey(password, user.salt, 64, {
    N: 32768,
    maxmem: 64 * 1024 * 1024,
  });
  return timingSafeEqual(key, Buffer.from(user.passwordHash, 'hex'));
}
