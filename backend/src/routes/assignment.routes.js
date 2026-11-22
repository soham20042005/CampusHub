import { Router } from 'express';
import assignmentController from '../controllers/assignment.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

// Faculty routes
router.post('/', authorize('FACULTY', 'ADMIN'), assignmentController.createAssignment);
router.get('/:id/submissions', authorize('FACULTY', 'ADMIN'), assignmentController.getSubmissions);
router.patch('/submissions/:submissionId/grade', authorize('FACULTY', 'ADMIN'), assignmentController.gradeSubmission);

// Student routes
router.post('/:id/submit', authorize('STUDENT'), assignmentController.submitAssignment);

// Shared / Queries
router.get('/subject/:subjectId', assignmentController.getAssignmentsBySubject);

export default router;
