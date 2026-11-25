import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { createAuthRequestChecks } from '../middleware/requestChecks.js';

// Preserve existing imports used by scripts and tests; implementations live in MVC modules.
export { initializeAuth } from '../models/authModel.js';
export { passwordFields, validPassword } from '../models/accountModel.js';
export { authenticatedUser } from '../middleware/auth.js';

export function authRoutes() {
  const router = Router();
  router.use(createAuthRequestChecks());
  router.post('/register', authController.register);
  router.post('/login', authController.login);
  router.get('/me', authController.getMe);
  router.post('/logout', authController.logout);
  router.post('/change-password', authController.changePassword);
  router.post('/forgot-password', authController.forgotPassword);
  router.post('/reset-password', authController.resetPassword);
  return router;
}
