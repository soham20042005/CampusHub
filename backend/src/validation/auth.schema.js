import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  role: z.enum(['ADMIN', 'STUDENT', 'FACULTY', 'PLACEMENT_OFFICER', 'CLUB_HEAD']),
  phone: z.string().optional(),
  // Profile specific fields
  rollNumber: z.string().optional(),
  employeeId: z.string().optional(),
  departmentId: z.string().uuid().optional(),
  courseId: z.string().uuid().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(1, 'Password is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().optional(),
});
