import 'dotenv/config';
import { connectDatabase, closeDatabase } from './database.js';

try {
  await connectDatabase();
  console.log('MongoDB connection verified successfully.');
} catch {
  console.error(
    'MongoDB connection failed. Check MONGODB_URI in backend/.env, your database password, and Atlas Network Access.',
  );
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
