import { ObjectId } from 'mongodb';
import { randomUUID } from 'node:crypto';
import { getMatch } from '../../../shared/matching.js';
import * as accountModel from '../models/accountModel.js';
import * as portalModel from '../models/portalModel.js';

const fail = (status, message) =>
  Object.assign(new Error(message), { status, publicMessage: message });
const text = (value, max = 120) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';
const idOf = (user) => user._id.toString();
const pair = (a, b) => [a, b].sort().join(':');
const participant = (record, id) => record?.members.includes(id);
export function profileOf(user) {
  return {
    id: idOf(user),
    name: user.name,
    profilePicture: user.profilePicture || '',
    university: user.university || '',
    field: user.field || '',
    location: user.location || '',
    bio: user.bio || '',
    availability: user.availability || '',
    teach: user.teach || [],
    learn: user.learn || [],
    category: user.category || 'Other',
    color: 'bg-violet-100 text-violet-700',
  };
}

const notify = (req, userId, title, description, path) =>
  portalModel.createNotification(req.db, {
    _id: randomUUID(),
    userId,
    title,
    description,
    path,
    read: false,
    createdAt: new Date(),
  });

async function account(req, id) {
  if (!ObjectId.isValid(id)) throw fail(404, 'Student not found.');
  const user = await accountModel.findById(req.db, new ObjectId(id));
  if (!user) throw fail(404, 'Student not found.');
  return user;
}

async function connected(req, other) {
  const connection = await portalModel.findAcceptedConnection(
    req.db,
    pair(req.actorId, other),
  );
  if (!connection) throw fail(403, 'An accepted connection is required.');
  return connection;
}

export async function getWorkspace(req, res) {
  const [users, connections, sessions, messages, reviews, notifications] =
    await Promise.all([
      accountModel.listStudentAccounts(req.db),
      portalModel.findConnectionsForUser(req.db, req.actorId),
      portalModel.findSessionsForUser(req.db, req.actorId),
      portalModel.findMessagesForUser(req.db, req.actorId),
      portalModel.findReviewsForUser(req.db, req.actorId),
      portalModel.findNotificationsForUser(req.db, req.actorId),
    ]);
  const related = new Set(connections.flatMap((item) => item.members));
  const students = users
    .filter(
      (user) =>
        idOf(user) !== req.actorId &&
        (user.preferences?.discoverable !== false || related.has(idOf(user))),
    )
    .map((user) => ({
      ...profileOf(user),
      discoverable: user.preferences?.discoverable !== false,
    }));
  const profile = profileOf(req.account);
  const demand = new Map();
  users
    .filter((user) => user.preferences?.discoverable !== false)
    .forEach((user) =>
      (user.learn || []).forEach((skill) => {
        const key = skill.toLowerCase();
        const entry = demand.get(key) || { skill, count: 0 };
        entry.count++;
        demand.set(key, entry);
      }),
    );
  res.json({
    profile,
    preferences: {
      discoverable: true,
      emailUpdates: false,
      ...req.account.preferences,
    },
    students: students.map((student) => ({
      ...student,
      match: getMatch(profile, student),
    })),
    connections: connections.map((item) => ({
      ...item,
      id: item._id,
      studentId: item.members.find((id) => id !== req.actorId),
      direction: item.senderId === req.actorId ? 'outgoing' : 'incoming',
    })),
    sessions: sessions.map((item) => ({
      ...item,
      id: item._id,
      studentId: item.members.find((id) => id !== req.actorId),
    })),
    messages: messages.reverse().map((item) => ({ ...item, id: item._id })),
    reviews: reviews.map((item) => ({ ...item, id: item._id })),
    notifications: notifications.map((item) => ({ ...item, id: item._id })),
    demand: [...demand.values()].sort((a, b) => b.count - a.count).slice(0, 10),
  });
}

export async function getStudentReviews(req, res) {
  const studentId = req.params.studentId;
  const student = await account(req, studentId);
  if (
    student.preferences?.discoverable === false &&
    studentId !== req.actorId
  ) {
    const connection = await portalModel.findConnection(
      req.db,
      pair(req.actorId, studentId),
    );
    if (!connection)
      throw fail(404, 'Student not found or their profile is private.');
  }
  const reviews = await portalModel.findReceivedReviews(req.db, idOf(student));
  const authorIds = [...new Set(reviews.map((review) => review.authorId))];
  const authors = await accountModel.findNamesByIds(
    req.db,
    authorIds.map((id) => new ObjectId(id)),
  );
  res.json({
    reviews: reviews.map((review) => ({
      id: review._id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      authorName:
        authors.find((author) => idOf(author) === review.authorId)?.name ||
        'Learning partner',
    })),
  });
}

export async function updateProfile(req, res) {
  if (!text(req.body?.name, 100)) throw fail(400, 'Your name is required.');
  const picture = req.body.profilePicture;
  if (picture !== undefined && picture !== '') {
    if (typeof picture !== 'string' || picture.length > 140000)
      throw fail(400, 'Choose a smaller profile picture.');
    const match =
      /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(
        picture,
      );
    if (!match || match[2].length % 4 !== 0)
      throw fail(400, 'Choose a JPEG, PNG, or WebP picture.');
    const bytes = Buffer.from(match[2], 'base64');
    const valid =
      match[1] === 'jpeg'
        ? bytes.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))
        : match[1] === 'png'
          ? bytes
              .subarray(0, 8)
              .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
          : bytes.toString('ascii', 0, 4) === 'RIFF' &&
            bytes.toString('ascii', 8, 12) === 'WEBP';
    if (!valid) throw fail(400, 'The profile picture is not a valid image.');
  }
  const changes = Object.fromEntries(
    [
      'name',
      'university',
      'field',
      'location',
      'availability',
      'category',
      'bio',
    ].map((key) => [
      key,
      text(req.body[key], key === 'bio' ? 600 : key === 'name' ? 100 : 120),
    ]),
  );
  if (picture !== undefined) changes.profilePicture = picture;
  await accountModel.update(req.db, req.account._id, changes);
  res.json({ message: 'Profile updated.' });
}

export async function updateSkills(req, res) {
  const { type, values } = req.body || {};
  if (
    !['teach', 'learn'].includes(type) ||
    !Array.isArray(values) ||
    values.length > 30 ||
    values.some(
      (value) =>
        typeof value !== 'string' || !value.trim() || value.length > 40,
    )
  )
    throw fail(400, 'Provide up to 30 skills, each 1–40 characters.');
  const unique = [
    ...new Map(
      values.map((value) => [value.trim().toLowerCase(), value.trim()]),
    ).values(),
  ];
  await accountModel.update(req.db, req.account._id, { [type]: unique });
  res.json({ message: 'Skills updated.' });
}

export async function updateSettings(req, res) {
  if (typeof req.body?.discoverable !== 'boolean')
    throw fail(400, 'Choose whether your profile is discoverable.');
  await accountModel.update(req.db, req.account._id, {
    preferences: { discoverable: req.body.discoverable },
  });
  res.json({ message: 'Preferences saved.' });
}

export async function createConnection(req, res) {
  const other = text(req.body?.recipientId);
  if (other === req.actorId) throw fail(400, 'Choose another student.');
  const recipient = await account(req, other);
  if (recipient.preferences?.discoverable === false)
    throw fail(403, 'This student is not accepting new requests.');
  const match = getMatch(profileOf(req.account), profileOf(recipient));
  if (!match.mutual)
    throw fail(
      400,
      'Add complementary teaching and learning skills before requesting an exchange.',
    );
  const record = {
    members: [req.actorId, other],
    senderId: req.actorId,
    recipientId: other,
    status: 'pending',
    createdAt: new Date(),
    exchange: match,
  };
  const existing = await portalModel.findConnection(
    req.db,
    pair(req.actorId, other),
  );
  if (existing && ['pending', 'accepted'].includes(existing.status))
    throw fail(409, 'A request or connection already exists.');
  if (existing) {
    const updated = await portalModel.updateConnection(
      req.db,
      existing._id,
      existing.status,
      record,
    );
    if (!updated.modifiedCount)
      throw fail(409, 'The connection changed. Please refresh.');
  } else {
    try {
      await portalModel.createConnection(req.db, {
        _id: pair(req.actorId, other),
        ...record,
      });
    } catch (error) {
      if (error.code === 11000) throw fail(409, 'A request already exists.');
      throw error;
    }
  }
  await notify(
    req,
    other,
    'New connection request',
    `${req.account.name} would like to exchange skills.`,
    '/app/requests',
  );
  res.status(201).json({ message: 'Connection request sent.' });
}

export async function updateConnection(req, res) {
  const record = await portalModel.findConnection(req.db, req.params.id);
  if (!participant(record, req.actorId))
    throw fail(404, 'Connection not found.');
  const status = req.body?.status;
  if (status === 'closed' && record.status === 'accepted') {
    await portalModel.updateConnection(req.db, record._id, 'accepted', {
      status: 'closed',
    });
  } else if (
    status === 'cancelled' &&
    record.status === 'pending' &&
    record.senderId === req.actorId
  ) {
    await portalModel.updateConnection(req.db, record._id, 'pending', {
      status,
    });
  } else {
    if (
      record.recipientId !== req.actorId ||
      record.status !== 'pending' ||
      !['accepted', 'declined'].includes(status)
    )
      throw fail(403, 'Only the recipient can respond to a pending request.');
    if (status === 'accepted') {
      const sender = await account(req, record.senderId);
      if (!getMatch(profileOf(req.account), profileOf(sender)).mutual)
        throw fail(
          409,
          'Your skills have changed. A mutual skill exchange is required.',
        );
    }
    const result = await portalModel.updateConnection(
      req.db,
      record._id,
      'pending',
      { status },
    );
    if (!result.modifiedCount)
      throw fail(409, 'This request has already been handled.');
    await notify(
      req,
      record.senderId,
      `Request ${status}`,
      `${req.account.name} ${status} your exchange request.`,
      '/app/connections',
    );
  }
  res.json({ message: 'Connection updated.' });
}

export async function sendMessage(req, res) {
  const recipientId = text(req.body?.recipientId);
  await connected(req, recipientId);
  const body = text(req.body?.text, 2000);
  if (!body) throw fail(400, 'Write a message first.');
  await portalModel.createMessage(req.db, {
    _id: randomUUID(),
    members: [req.actorId, recipientId],
    senderId: req.actorId,
    recipientId,
    text: body,
    createdAt: new Date(),
  });
  await notify(
    req,
    recipientId,
    'New message',
    `${req.account.name} sent you a message.`,
    `/app/messages?student=${recipientId === req.actorId ? recipientId : req.actorId}`,
  );
  res.status(201).json({ message: 'Message sent.' });
}

export async function createSession(req, res) {
  const studentId = text(req.body?.studentId);
  await connected(req, studentId);
  const startsAt = new Date(req.body?.startsAt);
  const duration = Number(req.body?.duration);
  const topic = text(req.body?.topic);
  if (
    !topic ||
    !Number.isFinite(startsAt.getTime()) ||
    startsAt <= new Date() ||
    !Number.isInteger(duration) ||
    duration < 15 ||
    duration > 240
  )
    throw fail(
      400,
      'Enter a topic, future date and duration between 15 and 240 minutes.',
    );
  const record = {
    _id: randomUUID(),
    members: [req.actorId, studentId],
    organizerId: req.actorId,
    topic,
    startsAt,
    duration,
    location: text(req.body?.location, 300),
    notes: text(req.body?.notes, 1000),
    status: 'upcoming',
    createdAt: new Date(),
  };
  await portalModel.createSession(req.db, record);
  await notify(
    req,
    studentId,
    'New learning session',
    `${req.account.name} scheduled ${topic}.`,
    `/app/sessions/${record._id}`,
  );
  res.status(201).json({ message: 'Session scheduled.', id: record._id });
}

export async function updateSession(req, res) {
  const session = await portalModel.findSession(req.db, req.params.id);
  if (!participant(session, req.actorId)) throw fail(404, 'Session not found.');
  const status = req.body?.status;
  if (
    session.status !== 'upcoming' ||
    !['completed', 'cancelled'].includes(status)
  )
    throw fail(409, 'Only upcoming sessions can be updated.');
  if (
    status === 'completed' &&
    new Date(session.startsAt).getTime() + session.duration * 60000 > Date.now()
  )
    throw fail(
      400,
      'Mark this session completed after its scheduled end time.',
    );
  const result = await portalModel.updateSession(req.db, session._id, {
    status,
  });
  if (!result.modifiedCount)
    throw fail(409, 'This session has already been updated.');
  await notify(
    req,
    session.members.find((id) => id !== req.actorId),
    `Session ${status}`,
    session.topic,
    `/app/sessions/${session._id}`,
  );
  res.json({ message: `Session ${status}.` });
}

export async function createReview(req, res) {
  const session = await portalModel.findSession(
    req.db,
    text(req.body?.sessionId),
  );
  if (!participant(session, req.actorId) || session.status !== 'completed')
    throw fail(403, 'You can review only your completed sessions.');
  const rating = Number(req.body?.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    throw fail(400, 'Choose a rating from 1 to 5.');
  const recipientId = session.members.find((id) => id !== req.actorId);
  try {
    await portalModel.createReview(req.db, {
      _id: `${session._id}:${req.actorId}`,
      sessionId: session._id,
      authorId: req.actorId,
      recipientId,
      rating,
      comment: text(req.body?.comment, 1000),
      createdAt: new Date(),
    });
  } catch (error) {
    if (error.code === 11000)
      throw fail(409, 'You already reviewed this session.');
    throw error;
  }
  await notify(
    req,
    recipientId,
    'New review',
    `${req.account.name} reviewed your learning session.`,
    '/app/reviews',
  );
  res.status(201).json({ message: 'Review published.' });
}

export async function markNotificationsRead(req, res) {
  await portalModel.markNotificationsRead(req.db, req.actorId);
  res.json({ message: 'Notifications marked as read.' });
}
