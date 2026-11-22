import placementRepository from '../repositories/placement.repository.js';
import { broadcastEvent } from '../config/socket.js';

class PlacementService {
  async createCompany(data) {
    return await placementRepository.createCompany(data);
  }

  async getCompanies() {
    return await placementRepository.findAllCompanies();
  }

  async createDrive(data) {
    const drive = await placementRepository.createDrive(data);

    // Real-Time Notification Broadcast to all students
    broadcastEvent('new_placement_drive', {
      message: `💼 New Placement Drive Posted: ${drive.jobTitle}`,
      drive,
    });

    return drive;
  }

  async getDrives() {
    return await placementRepository.findAllDrives();
  }

  async applyToDrive(studentUser, driveId) {
    if (!studentUser.studentProfile) {
      const error = new Error('Only registered students can apply for placement drives');
      error.statusCode = 403;
      throw error;
    }

    const student = studentUser.studentProfile;
    const drive = await placementRepository.findDriveById(driveId);

    if (!drive) {
      const error = new Error(`Placement drive with ID '${driveId}' not found`);
      error.statusCode = 404;
      throw error;
    }

    // Deadline check
    if (new Date() > drive.deadline) {
      const error = new Error('Placement drive application deadline has passed');
      error.statusCode = 400;
      throw error;
    }

    // Eligibility Checker (CGPA & Backlogs)
    if (Number(student.cgpa) < Number(drive.minCgpa)) {
      const error = new Error(
        `Ineligible: Minimum required CGPA is ${drive.minCgpa}, but your CGPA is ${student.cgpa}`
      );
      error.statusCode = 400;
      throw error;
    }

    if (student.backlogsCount > drive.maxBacklogs) {
      const error = new Error(
        `Ineligible: Drive allows maximum ${drive.maxBacklogs} backlogs, but you have ${student.backlogsCount}`
      );
      error.statusCode = 400;
      throw error;
    }

    return await placementRepository.applyToDrive(driveId, student.id);
  }

  async updateApplicationStatus(applicationId, status) {
    return await placementRepository.updateApplicationStatus(applicationId, status);
  }

  async getDriveApplications(driveId) {
    return await placementRepository.findApplicationsByDrive(driveId);
  }
}

export default new PlacementService();
