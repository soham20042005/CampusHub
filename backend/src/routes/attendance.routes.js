import { Router } from 'express';
import attendanceController from '../controllers/attendance.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

// Faculty Logging
router.post('/sessions', authorize('FACULTY', 'ADMIN'), attendanceController.logAttendance);

// Attendance Queries
router.get('/student/:studentId?/subject/:subjectId', attendanceController.getStudentSubjectStats);
router.get('/student/:studentId?', attendanceController.getStudentOverall);

export default router;
