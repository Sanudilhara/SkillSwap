import { MongoClient } from 'mongodb';

let client;

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.includes('<db_password>')) {
    throw new Error(
      'Set MONGODB_URI in backend/.env with your MongoDB database password.',
    );
  }

  client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DB || 'skillswap');
    await database.command({ ping: 1 });
    return database;
  } catch (error) {
    await closeDatabase();
    throw error;
  }
}

export async function closeDatabase() {
  if (client) {
    await client.close();
    client = undefined;
  }
}
