import assignmentRepository from '../repositories/assignment.repository.js';

class AssignmentService {
  async createAssignment(facultyUser, data) {
    if (!facultyUser.facultyProfile) {
      const error = new Error('Only faculty members can create assignments');
      error.statusCode = 403;
      throw error;
    }
    const facultyId = facultyUser.facultyProfile.id;
    return await assignmentRepository.createAssignment(facultyId, data);
  }

  async getAssignmentsBySubject(subjectId) {
    return await assignmentRepository.findAssignmentsBySubject(subjectId);
  }

  async submitAssignment(studentUser, assignmentId, submissionUrl) {
    if (!studentUser.studentProfile) {
      const error = new Error('Only registered students can submit assignments');
      error.statusCode = 403;
      throw error;
    }

    const assignment = await assignmentRepository.findAssignmentById(assignmentId);
    if (!assignment) {
      const error = new Error(`Assignment with ID '${assignmentId}' not found`);
      error.statusCode = 404;
      throw error;
    }

    // Deadline check
    if (new Date() > assignment.dueDate) {
      const error = new Error('Submission deadline has passed. Late submissions are not accepted');
      error.statusCode = 400;
      throw error;
    }

    const studentId = studentUser.studentProfile.id;
    return await assignmentRepository.submitAssignment(studentId, assignmentId, submissionUrl);
  }

  async gradeSubmission(facultyUser, submissionId, { marksObtained, feedback }) {
    return await assignmentRepository.gradeSubmission(submissionId, marksObtained, feedback);
  }

  async getSubmissions(assignmentId) {
    return await assignmentRepository.findSubmissionsByAssignment(assignmentId);
  }
}

export default new AssignmentService();
