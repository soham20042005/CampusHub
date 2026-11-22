import prisma from '../config/db.js';

class AssignmentRepository {
  async createAssignment(facultyId, data) {
    return await prisma.assignment.create({
      data: {
        subjectId: data.subjectId,
        facultyId,
        title: data.title,
        description: data.description,
        attachmentUrl: data.attachmentUrl,
        dueDate: new Date(data.dueDate),
        maxMarks: data.maxMarks,
      },
    });
  }

  async findAssignmentsBySubject(subjectId) {
    return await prisma.assignment.findMany({
      where: { subjectId },
      include: {
        subject: { select: { code: true, name: true } },
        faculty: {
          select: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
        _count: { select: { submissions: true } },
      },
      orderBy: { dueDate: 'asc' },
    });
  }

  async findAssignmentById(id) {
    return await prisma.assignment.findUnique({
      where: { id },
      include: {
        subject: true,
        faculty: {
          include: { user: { select: { firstName: true, lastName: true } } },
        },
      },
    });
  }

  async submitAssignment(studentId, assignmentId, submissionUrl) {
    return await prisma.assignmentSubmission.upsert({
      where: {
        assignmentId_studentId: { assignmentId, studentId },
      },
      create: {
        assignmentId,
        studentId,
        submissionUrl,
      },
      update: {
        submissionUrl,
        submittedAt: new Date(),
      },
    });
  }

  async gradeSubmission(submissionId, marksObtained, feedback) {
    return await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        marksObtained,
        feedback,
        evaluatedAt: new Date(),
      },
    });
  }

  async findSubmissionsByAssignment(assignmentId) {
    return await prisma.assignmentSubmission.findMany({
      where: { assignmentId },
      include: {
        student: {
          select: {
            rollNumber: true,
            user: { select: { firstName: true, lastName: true, email: true } },
          },
        },
      },
      orderBy: { submittedAt: 'asc' },
    });
  }
}

export default new AssignmentRepository();
