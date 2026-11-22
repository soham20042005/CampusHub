import { z } from 'zod';

export const createClubSchema = z.object({
  code: z.string().min(2).max(30).transform((v) => v.toUpperCase()),
  name: z.string().min(3).max(150),
  description: z.string().min(10),
  logoUrl: z.string().url().optional(),
  advisorFacultyId: z.string().uuid().optional(),
});

export const createEventSchema = z.object({
  clubId: z.string().uuid(),
  title: z.string().min(3).max(200),
  description: z.string().min(10),
  venue: z.string().min(2).max(150),
  eventDate: z.string().datetime('Must be an ISO datetime string'),
  maxSeats: z.number().min(1).optional(),
  bannerUrl: z.string().url().optional(),
});

export const joinClubSchema = z.object({
  clubId: z.string().uuid(),
});
