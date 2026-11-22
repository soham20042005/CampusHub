import { z } from 'zod';

export const logAttendanceSessionSchema = z.object({
  allocationId: z.string().uuid(),
  slotId: z.string().uuid().optional(),
  sessionDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  records: z
    .array(
      z.object({
        studentId: z.string().uuid(),
        status: z.enum(['PRESENT', 'ABSENT', 'EXCUSED']),
      })
    )
    .min(1, 'At least one student attendance record must be provided'),
});
