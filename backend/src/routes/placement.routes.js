import { Router } from 'express';
import placementController from '../controllers/placement.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorize } from '../middlewares/rbac.middleware.js';

const router = Router();

router.use(authenticate);

// Companies
router.get('/companies', placementController.getCompanies);
router.post('/companies', authorize('PLACEMENT_OFFICER', 'ADMIN'), placementController.createCompany);

// Drives
router.get('/drives', placementController.getDrives);
router.post('/drives', authorize('PLACEMENT_OFFICER', 'ADMIN'), placementController.createDrive);
router.post('/drives/:id/apply', authorize('STUDENT'), placementController.applyToDrive);

// ATS Candidate Tracking
router.get('/drives/:id/applications', authorize('PLACEMENT_OFFICER', 'ADMIN'), placementController.getApplications);
router.patch('/applications/:applicationId/status', authorize('PLACEMENT_OFFICER', 'ADMIN'), placementController.updateStatus);

export default router;
