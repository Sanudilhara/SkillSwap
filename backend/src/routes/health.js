import { Router } from 'express';
import { getHealth } from '../controllers/healthController.js';

export function healthRoutes() {
  const router = Router();
  router.get('/health', getHealth);
  return router;
}
