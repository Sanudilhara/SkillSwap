import 'dotenv/config';
import app from './app.js';
import { connectDatabase, closeDatabase } from './database.js';
import { initializeAuth } from './models/authModel.js';
import { initializePortal } from './models/portalModel.js';
import { configureMail } from './mail.js';

const port = process.env.PORT || 4000;

try {
  app.locals.db = await connectDatabase();
  await initializeAuth(app.locals.db);
  await initializePortal(app.locals.db);
  configureMail(app);
  console.log('Connected to MongoDB.');
} catch {
  console.error(
    'Could not initialize SkillSwap. Check MONGODB_URI, JWT_SECRET (at least 32 characters), and Atlas Network Access.',
  );
  process.exit(1);
}

const server = app.listen(port, '127.0.0.1', (error) => {
  if (error) {
    console.error(`Could not start SkillSwap API: ${error.message}`);
    process.exit(1);
  }

  console.log(`SkillSwap API is running at http://127.0.0.1:${port}`);
});

async function shutdown() {
  server.close(async () => {
    await closeDatabase();
    process.exit(0);
  });
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
