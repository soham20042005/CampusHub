import { z } from 'zod';

export const createTimetableSlotSchema = z.object({
  semesterId: z.string().uuid(),
  subjectId: z.string().uuid(),
  facultyId: z.string().uuid(),
  dayOfWeek: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format (24-hour)'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format (24-hour)'),
  roomNumber: z.string().min(1).max(50),
});
