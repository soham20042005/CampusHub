import { Router } from 'express';
import academicController from '../controllers/academic.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';

const router = Router();

// Protect all routes
router.use(authenticate);

// Department Endpoints
router.get('/departments', academicController.getDepartments);
router.get('/departments/:id', academicController.getDepartmentById);
router.post('/departments', authorize('ADMIN'), academicController.createDepartment);

// Course Endpoints
router.get('/courses', academicController.getCourses);
router.post('/courses', authorize('ADMIN'), academicController.createCourse);

// Academic Year Endpoints
router.get('/years', academicController.getAcademicYears);
router.post('/years', authorize('ADMIN'), academicController.createAcademicYear);

// Subject Endpoints
router.get('/subjects', academicController.getSubjects);
router.post('/subjects', authorize('ADMIN'), academicController.createSubject);

export default router;
