import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(2).max(150),
  industry: z.string().min(2).max(100),
  website: z.string().url().optional(),
  hrName: z.string().min(2).max(100),
  hrEmail: z.string().email(),
});

export const createPlacementDriveSchema = z.object({
  companyId: z.string().uuid(),
  jobTitle: z.string().min(3).max(150),
  jobDescription: z.string().min(10),
  packageLPA: z.number().positive(),
  minCgpa: z.number().min(0).max(10).default(6.0),
  maxBacklogs: z.number().min(0).default(0),
  deadline: z.string().datetime('Must be an ISO datetime string'),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(['APPLIED', 'SHORTLISTED', 'INTERVIEW_SCHEDULED', 'SELECTED', 'REJECTED']),
});
