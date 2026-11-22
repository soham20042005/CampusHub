import { Router } from 'express';
import announcementController from '../controllers/announcement.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/', announcementController.getAnnouncements);
router.post('/', authorize('ADMIN', 'FACULTY'), announcementController.createAnnouncement);

export default router;
