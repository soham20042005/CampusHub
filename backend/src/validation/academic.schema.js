import { z } from 'zod';

export const createDepartmentSchema = z.object({
  code: z.string().min(2).max(20).transform((v) => v.toUpperCase()),
  name: z.string().min(3).max(150),
  description: z.string().optional(),
});

export const createCourseSchema = z.object({
  code: z.string().min(2).max(20).transform((v) => v.toUpperCase()),
  name: z.string().min(3).max(150),
  departmentId: z.string().uuid(),
  durationYears: z.number().min(1).max(6).default(4),
  totalSemesters: z.number().min(1).max(12).default(8),
});

export const createAcademicYearSchema = z.object({
  yearLabel: z.string().regex(/^\d{4}-\d{4}$/, 'Format must be YYYY-YYYY (e.g. 2024-2025)'),
  isCurrent: z.boolean().default(false),
});

export const createSubjectSchema = z.object({
  code: z.string().min(2).max(20).transform((v) => v.toUpperCase()),
  name: z.string().min(3).max(150),
  credits: z.number().min(1).max(10).default(3),
  departmentId: z.string().uuid(),
  courseId: z.string().uuid(),
  semesterNumber: z.number().min(1).max(12),
});
