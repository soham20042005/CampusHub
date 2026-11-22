import { z } from 'zod';

export const createAnnouncementSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10),
  targetRole: z.enum(['ALL', 'STUDENT', 'FACULTY']).default('ALL'),
  departmentId: z.string().uuid().optional(),
});
