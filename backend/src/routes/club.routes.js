import { Router } from 'express';
import clubController from '../controllers/club.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

// Clubs
router.get('/', clubController.getClubs);
router.get('/:id', clubController.getClubById);
router.post('/', authorize('ADMIN', 'CLUB_HEAD'), clubController.createClub);
router.post('/join', authorize('STUDENT'), clubController.joinClub);

// Events
router.get('/events/all', clubController.getEvents);
router.post('/events', authorize('ADMIN', 'CLUB_HEAD'), clubController.createEvent);
router.post('/events/:id/register', clubController.registerForEvent);

export default router;
