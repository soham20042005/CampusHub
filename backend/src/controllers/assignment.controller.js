import assignmentService from '../services/assignment.service.js';
import {
  createAssignmentSchema,
  submitAssignmentSchema,
  gradeSubmissionSchema,
} from '../validation/assignment.schema.js';

class AssignmentController {
  async createAssignment(req, res, next) {
    try {
      const validated = createAssignmentSchema.parse(req.body);
      const assignment = await assignmentService.createAssignment(req.user, validated);

      res.status(201).json({
        status: 'success',
        message: 'Assignment created successfully',
        data: { assignment },
      });
    } catch (err) {
      next(err);
    }
  }

  async getAssignmentsBySubject(req, res, next) {
    try {
      const { subjectId } = req.params;
      const assignments = await assignmentService.getAssignmentsBySubject(subjectId);

      res.status(200).json({ status: 'success', data: { assignments } });
    } catch (err) {
      next(err);
    }
  }

  async submitAssignment(req, res, next) {
    try {
      const { id: assignmentId } = req.params;
      const { submissionUrl } = submitAssignmentSchema.parse(req.body);
      const submission = await assignmentService.submitAssignment(
        req.user,
        assignmentId,
        submissionUrl
      );

      res.status(200).json({
        status: 'success',
        message: 'Assignment submitted successfully',
        data: { submission },
      });
    } catch (err) {
      next(err);
    }
  }

  async gradeSubmission(req, res, next) {
    try {
      const { submissionId } = req.params;
      const validated = gradeSubmissionSchema.parse(req.body);
      const submission = await assignmentService.gradeSubmission(
        req.user,
        submissionId,
        validated
      );

      res.status(200).json({
        status: 'success',
        message: 'Submission graded successfully',
        data: { submission },
      });
    } catch (err) {
      next(err);
    }
  }

  async getSubmissions(req, res, next) {
    try {
      const { id: assignmentId } = req.params;
      const submissions = await assignmentService.getSubmissions(assignmentId);

      res.status(200).json({ status: 'success', data: { submissions } });
    } catch (err) {
      next(err);
    }
  }
}

export default new AssignmentController();
