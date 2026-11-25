import { Router } from 'express';
import * as portalController from '../controllers/portalController.js';
import { checkPortalRequests } from '../middleware/requestChecks.js';
import { requireAuth } from '../middleware/auth.js';

// Compatibility exports for existing startup scripts and tests.
export { initializePortal } from '../models/portalModel.js';
export { profileOf } from '../controllers/portalController.js';

export function portalRoutes() {
  const router = Router();
  router.use(checkPortalRequests, requireAuth);
  router.get('/workspace', portalController.getWorkspace);
  router.get(
    '/students/:studentId/reviews',
    portalController.getStudentReviews,
  );
  router.put('/profile', portalController.updateProfile);
  router.put('/skills', portalController.updateSkills);
  router.put('/settings', portalController.updateSettings);
  router.post('/connections', portalController.createConnection);
  router.patch('/connections/:id', portalController.updateConnection);
  router.post('/messages', portalController.sendMessage);
  router.post('/sessions', portalController.createSession);
  router.patch('/sessions/:id', portalController.updateSession);
  router.post('/reviews', portalController.createReview);
  router.post('/notifications/read', portalController.markNotificationsRead);
  return router;
}
