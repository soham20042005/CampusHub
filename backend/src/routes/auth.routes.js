import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);

// Protected Routes
router.get('/me', authenticate, authController.getMe);

export default router;
