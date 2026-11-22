import { Router } from 'express';
import userController from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';

const router = Router();

// Protect all user management routes with authentication
router.use(authenticate);

// Admin-only endpoints
router.get('/', authorize('ADMIN'), userController.getUsers);
router.patch('/:id/status', authorize('ADMIN'), userController.toggleStatus);

// Admin + Self-access endpoints
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);

export default router;
