import prisma from '../config/db.js';

class PlacementRepository {
  async createCompany(data) {
    return await prisma.company.create({ data });
  }

  async findAllCompanies() {
    return await prisma.company.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { placementDrives: true } } },
    });
  }

  async createDrive(data) {
    return await prisma.placementDrive.create({
      data: {
        companyId: data.companyId,
        jobTitle: data.jobTitle,
        jobDescription: data.jobDescription,
        packageLPA: data.packageLPA,
        minCgpa: data.minCgpa,
        maxBacklogs: data.maxBacklogs,
        deadline: new Date(data.deadline),
      },
    });
  }

  async findAllDrives() {
    return await prisma.placementDrive.findMany({
      orderBy: { deadline: 'asc' },
      include: {
        company: { select: { name: true, industry: true } },
        _count: { select: { applications: true } },
      },
    });
  }

  async findDriveById(id) {
    return await prisma.placementDrive.findUnique({
      where: { id },
      include: { company: true },
    });
  }

  async applyToDrive(driveId, studentId) {
    return await prisma.jobApplication.create({
      data: { driveId, studentId, status: 'APPLIED' },
    });
  }

  async updateApplicationStatus(applicationId, status) {
    return await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status },
    });
  }

  async findApplicationsByDrive(driveId) {
    return await prisma.jobApplication.findMany({
      where: { driveId },
      include: {
        student: {
          select: {
            rollNumber: true,
            cgpa: true,
            backlogsCount: true,
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        },
      },
      orderBy: { appliedAt: 'asc' },
    });
  }
}

export default new PlacementRepository();
