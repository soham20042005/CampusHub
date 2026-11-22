import { Router } from 'express';
import timetableController from '../controllers/timetable.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

router.get('/semester/:semesterId', timetableController.getSemesterTimetable);
router.get('/faculty/:facultyId?', timetableController.getFacultyTimetable);
router.post('/slots', authorize('ADMIN'), timetableController.createSlot);

export default router;
