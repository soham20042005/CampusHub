import placementService from '../services/placement.service.js';
import {
  createCompanySchema,
  createPlacementDriveSchema,
  updateApplicationStatusSchema,
} from '../validation/placement.schema.js';

class PlacementController {
  // Companies
  async createCompany(req, res, next) {
    try {
      const validated = createCompanySchema.parse(req.body);
      const company = await placementService.createCompany(validated);
      res.status(201).json({ status: 'success', data: { company } });
    } catch (err) {
      next(err);
    }
  }

  async getCompanies(req, res, next) {
    try {
      const companies = await placementService.getCompanies();
      res.status(200).json({ status: 'success', data: { companies } });
    } catch (err) {
      next(err);
    }
  }

  // Drives
  async createDrive(req, res, next) {
    try {
      const validated = createPlacementDriveSchema.parse(req.body);
      const drive = await placementService.createDrive(validated);
      res.status(201).json({ status: 'success', data: { drive } });
    } catch (err) {
      next(err);
    }
  }

  async getDrives(req, res, next) {
    try {
      const drives = await placementService.getDrives();
      res.status(200).json({ status: 'success', data: { drives } });
    } catch (err) {
      next(err);
    }
  }

  // Applications
  async applyToDrive(req, res, next) {
    try {
      const { id: driveId } = req.params;
      const application = await placementService.applyToDrive(req.user, driveId);
      res.status(201).json({
        status: 'success',
        message: 'Applied for placement drive successfully',
        data: { application },
      });
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { applicationId } = req.params;
      const { status } = updateApplicationStatusSchema.parse(req.body);
      const updated = await placementService.updateApplicationStatus(applicationId, status);

      res.status(200).json({
        status: 'success',
        message: `Application status updated to ${status}`,
        data: { application: updated },
      });
    } catch (err) {
      next(err);
    }
  }

  async getApplications(req, res, next) {
    try {
      const { id: driveId } = req.params;
      const applications = await placementService.getDriveApplications(driveId);
      res.status(200).json({ status: 'success', data: { applications } });
    } catch (err) {
      next(err);
    }
  }
}

export default new PlacementController();
