import express from 'express';
import { authRoutes } from './routes/auth.js';
import { portalRoutes } from './routes/portal.js';
import { healthRoutes } from './routes/health.js';
import { apiNotFound, errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use('/api/auth', authRoutes());
  app.use('/api/portal', portalRoutes());

  app.use('/api', healthRoutes());
  app.use('/api', apiNotFound);
  app.use(errorHandler);
  return app;
}

export default createApp();
