import { z } from 'zod';

export const createAssignmentSchema = z.object({
  subjectId: z.string().uuid(),
  title: z.string().min(3).max(200),
  description: z.string().min(5),
  attachmentUrl: z.string().url().optional(),
  dueDate: z.string().datetime('Must be an ISO datetime string'),
  maxMarks: z.number().min(1).default(100),
});

export const submitAssignmentSchema = z.object({
  submissionUrl: z.string().url('Must be a valid submission file URL'),
});

export const gradeSubmissionSchema = z.object({
  marksObtained: z.number().min(0),
  feedback: z.string().optional(),
});
