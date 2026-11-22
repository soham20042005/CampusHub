import { z } from 'zod';

export const getUsersQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
  role: z.enum(['ADMIN', 'STUDENT', 'FACULTY', 'PLACEMENT_OFFICER', 'CLUB_HEAD']).optional(),
  departmentId: z.string().uuid().optional(),
  search: z.string().optional(),
  isActive: z.enum(['true', 'false']).optional().transform((val) => val === 'true'),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  phone: z.string().optional(),
  avatarUrl: z.string().url().optional(),
  // Profile specific updates
  studentProfile: z
    .object({
      departmentId: z.string().uuid().optional(),
      courseId: z.string().uuid().optional(),
      currentSemester: z.number().min(1).max(8).optional(),
      cgpa: z.number().min(0).max(10).optional(),
      backlogsCount: z.number().min(0).optional(),
    })
    .optional(),
  facultyProfile: z
    .object({
      departmentId: z.string().uuid().optional(),
      designation: z.string().optional(),
      qualification: z.string().optional(),
    })
    .optional(),
});

export const toggleUserStatusSchema = z.object({
  isActive: z.boolean(),
});
