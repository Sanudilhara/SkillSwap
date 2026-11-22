export async function initializePortal(db) {
  await db.collection('connections').createIndex({ members: 1 });
  await db.collection('messages').createIndex({ members: 1, createdAt: -1 });
  await db
    .collection('exchangeSessions')
    .createIndex({ members: 1, startsAt: 1 });
  await db
    .collection('notifications')
    .createIndex({ userId: 1, createdAt: -1 });
}

export function findConnectionsForUser(db, userId) {
  return db.collection('connections').find({ members: userId }).toArray();
}

export function findSessionsForUser(db, userId) {
  return db
    .collection('exchangeSessions')
    .find({ members: userId })
    .sort({ startsAt: 1 })
    .toArray();
}

export function findMessagesForUser(db, userId) {
  return db
    .collection('messages')
    .find({ members: userId })
    .sort({ createdAt: -1 })
    .limit(500)
    .toArray();
}

export function findReviewsForUser(db, userId) {
  return db
    .collection('reviews')
    .find({ $or: [{ authorId: userId }, { recipientId: userId }] })
    .toArray();
}

export function findNotificationsForUser(db, userId) {
  return db
    .collection('notifications')
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();
}

export function findConnection(db, id) {
  return db.collection('connections').findOne({ _id: id });
}

export function findAcceptedConnection(db, id) {
  return db.collection('connections').findOne({ _id: id, status: 'accepted' });
}

export function createConnection(db, connection) {
  return db.collection('connections').insertOne(connection);
}

export function updateConnection(db, id, expectedStatus, changes) {
  return db
    .collection('connections')
    .updateOne({ _id: id, status: expectedStatus }, { $set: changes });
}

export function createMessage(db, message) {
  return db.collection('messages').insertOne(message);
}

export function findSession(db, id) {
  return db.collection('exchangeSessions').findOne({ _id: id });
}

export function createSession(db, session) {
  return db.collection('exchangeSessions').insertOne(session);
}

export function updateSession(db, id, changes) {
  return db
    .collection('exchangeSessions')
    .updateOne({ _id: id, status: 'upcoming' }, { $set: changes });
}

export function createReview(db, review) {
  return db.collection('reviews').insertOne(review);
}

export function createNotification(db, notification) {
  return db.collection('notifications').insertOne(notification);
}

export function markNotificationsRead(db, userId) {
  return db
    .collection('notifications')
    .updateMany({ userId }, { $set: { read: true } });
}
