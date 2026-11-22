import 'dotenv/config';
import { connectDatabase, closeDatabase } from './database.js';
import { initializeAuth } from './models/authModel.js';
import { initializePortal } from './models/portalModel.js';
import { seedDummyData, removeDummyData, dummyPassword } from './dummyData.js';

try {
  if (process.env.NODE_ENV === 'production')
    throw new Error('Dummy data commands are for development only.');
  const db = await connectDatabase();
  if (process.argv.includes('--remove')) {
    const removed = await removeDummyData(db);
    console.log(
      `Removed ${removed} dummy accounts and their related records from ${db.databaseName}.`,
    );
  } else {
    await initializeAuth(db);
    await initializePortal(db);
    const counts = await seedDummyData(db);
    console.log(
      `Dummy data added to ${db.databaseName}: ${JSON.stringify(counts)}`,
    );
    console.log(`Test login: alex.test@example.test / ${dummyPassword}`);
    console.log(
      'Existing accounts were preserved. Run npm run db:unseed to remove the dummy data.',
    );
  }
} catch (error) {
  // Do not print connection strings or database credentials on failure.
  console.error(
    'Dummy data command failed:',
    error.name === 'MongoServerSelectionError'
      ? 'Could not connect to MongoDB.'
      : error.message,
  );
  process.exitCode = 1;
} finally {
  await closeDatabase();
}
