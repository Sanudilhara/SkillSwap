import { passwordFields } from './models/accountModel.js';
import { getMatch } from '../../shared/matching.js';
import { dummyStudents } from './data/dummyStudents.js';

export const seedTag = 'skillswap-dummy-v1';
export const dummyPassword = 'SkillSwapTest123!';

export async function seedDummyData(db) {
  const counts = {};
  const accounts = {};
  const now = Date.now();
  const daysFromNow = (days) => new Date(now + days * 86400000);

  // Insert only: rerunning the command preserves existing accounts and changes.
  async function insert(collection, query, record) {
    if (await db.collection(collection).findOne(query)) return;
    await db.collection(collection).insertOne({ ...record, seedTag });
    counts[collection] = (counts[collection] || 0) + 1;
  }

  // Refuse to reuse an email belonging to an account this script did not create.
  for (const student of dummyStudents) {
    const email = `${student.key}.test@example.test`;
    const existing = await db.collection('accounts').findOne({ email });
    if (existing && existing.seedTag !== seedTag)
      throw new Error(
        `Cannot seed: ${email} already belongs to another account.`,
      );
  }

  for (const { key, ...profile } of dummyStudents) {
    const email = `${key}.test@example.test`;
    const query = { email };
    if (!(await db.collection('accounts').findOne(query))) {
      await insert('accounts', query, {
        ...profile,
        email,
        ...(await passwordFields(dummyPassword)),
        availability:
          'Weekday evenings and weekend afternoons (Europe/Helsinki)',
        preferences: { discoverable: true },
        createdAt: daysFromNow(-14),
      });
    }
    accounts[key] = await db.collection('accounts').findOne(query);
  }

  const id = (key) => accounts[key]._id.toString();
  async function connection(from, to, status) {
    const members = [id(from), id(to)];
    const _id = [...members].sort().join(':');
    await insert(
      'connections',
      { _id },
      {
        _id,
        members,
        senderId: id(from),
        recipientId: id(to),
        status,
        exchange: getMatch(accounts[from], accounts[to]),
        createdAt: daysFromNow(-7),
      },
    );
  }
  for (const [from, to, status] of [
    ['alex', 'maya', 'accepted'],
    ['alex', 'noah', 'accepted'],
    ['alex', 'aisha', 'accepted'],
    ['ethan', 'alex', 'pending'],
    ['alex', 'emma', 'pending'],
    ['leo', 'aisha', 'pending'],
    ['sofia', 'emma', 'accepted'],
  ])
    await connection(from, to, status);

  const sessions = [
    {
      key: 'react-design',
      from: 'alex',
      to: 'maya',
      topic: 'React components and Figma layouts',
      day: 2,
      status: 'upcoming',
    },
    {
      key: 'portfolio-photos',
      from: 'noah',
      to: 'alex',
      topic: 'Photography for a developer portfolio',
      day: 4,
      status: 'upcoming',
    },
    {
      key: 'design-basics',
      from: 'maya',
      to: 'alex',
      topic: 'Introduction to UI/UX design',
      day: -5,
      status: 'completed',
    },
    {
      key: 'python-basics',
      from: 'aisha',
      to: 'alex',
      topic: 'Python basics and JavaScript practice',
      day: -3,
      status: 'completed',
    },
    {
      key: 'music-photos',
      from: 'sofia',
      to: 'emma',
      topic: 'Guitar practice and concert photography',
      day: 5,
      status: 'upcoming',
    },
  ];
  for (const session of sessions) {
    const _id = `${seedTag}:session:${session.key}`;
    await insert(
      'exchangeSessions',
      { _id },
      {
        _id,
        members: [id(session.from), id(session.to)],
        organizerId: id(session.from),
        topic: session.topic,
        startsAt: daysFromNow(session.day),
        duration: 60,
        location: 'Online meeting — agree on a link in messages',
        notes: 'Dummy session for testing the scheduling and review pages.',
        status: session.status,
        createdAt: daysFromNow(-7),
      },
    );
  }

  const messages = [
    [
      'maya',
      'alex',
      'Hi Alex! Shall we go through a Figma layout and turn it into a React component?',
    ],
    [
      'alex',
      'maya',
      'Sounds good. I can explain props and reusable components during our session.',
    ],
    [
      'noah',
      'alex',
      'Bring a few portfolio photos and we can discuss lighting and composition.',
    ],
    [
      'alex',
      'noah',
      'Great! I can help you set up a React portfolio in return.',
    ],
    [
      'aisha',
      'alex',
      'Thanks for our Python and JavaScript exchange. The examples were helpful!',
    ],
    [
      'emma',
      'sofia',
      'Looking forward to practicing guitar and sharing some photography tips.',
    ],
  ];
  for (const [index, [from, to, text]] of messages.entries()) {
    const _id = `${seedTag}:message:${index}`;
    await insert(
      'messages',
      { _id },
      {
        _id,
        members: [id(from), id(to)],
        senderId: id(from),
        recipientId: id(to),
        text,
        createdAt: new Date(now - (messages.length - index) * 3600000),
      },
    );
  }

  for (const [key, author, recipient, rating, comment] of [
    [
      'design-basics',
      'alex',
      'maya',
      5,
      'Clear explanations and practical design exercises.',
    ],
    [
      'design-basics',
      'maya',
      'alex',
      5,
      'Patient React guidance with useful examples.',
    ],
    [
      'python-basics',
      'alex',
      'aisha',
      5,
      'The Python examples made the basics easy to follow.',
    ],
    [
      'python-basics',
      'aisha',
      'alex',
      4,
      'A helpful introduction to JavaScript.',
    ],
  ]) {
    const sessionId = `${seedTag}:session:${key}`;
    const _id = `${sessionId}:${id(author)}`;
    await insert(
      'reviews',
      { _id },
      {
        _id,
        sessionId,
        authorId: id(author),
        recipientId: id(recipient),
        rating,
        comment,
        createdAt: daysFromNow(-2),
      },
    );
  }

  for (const [index, [key, title, description, path]] of [
    [
      'alex',
      'New connection request',
      'Ethan would like to exchange skills.',
      '/app/requests',
    ],
    [
      'alex',
      'Upcoming learning session',
      'Your React and Figma exchange is scheduled.',
      `/app/sessions/${seedTag}:session:react-design`,
    ],
    [
      'alex',
      'New message',
      'Maya sent you a message.',
      `/app/messages?student=${id('maya')}`,
    ],
    [
      'alex',
      'New review',
      'Aisha reviewed your completed exchange.',
      '/app/reviews',
    ],
    [
      'emma',
      'New connection request',
      'Alex would like to exchange skills.',
      '/app/requests',
    ],
    [
      'aisha',
      'New connection request',
      'Leo would like to exchange skills.',
      '/app/requests',
    ],
  ].entries()) {
    const _id = `${seedTag}:notification:${index}`;
    await insert(
      'notifications',
      { _id },
      {
        _id,
        userId: id(key),
        title,
        description,
        path,
        read: false,
        createdAt: daysFromNow(-1),
      },
    );
  }
  return counts;
}

export async function removeDummyData(db) {
  const accounts = await db.collection('accounts').find({ seedTag }).toArray();
  const accountIds = accounts.map((account) => account._id);
  const ids = accountIds.map((id) => id.toString());
  // Remove only seed records and records linked to these dummy accounts.
  for (const collection of ['connections', 'messages', 'exchangeSessions']) {
    await db
      .collection(collection)
      .deleteMany({ $or: [{ seedTag }, { members: { $in: ids } }] });
  }
  await db.collection('reviews').deleteMany({
    $or: [
      { seedTag },
      { authorId: { $in: ids } },
      { recipientId: { $in: ids } },
    ],
  });
  await db
    .collection('notifications')
    .deleteMany({ $or: [{ seedTag }, { userId: { $in: ids } }] });
  for (const collection of ['sessions', 'passwordResets'])
    await db.collection(collection).deleteMany({ userId: { $in: accountIds } });
  await db.collection('accounts').deleteMany({ seedTag });
  return accounts.length;
}
