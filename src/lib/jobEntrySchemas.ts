import { z } from "zod";

// from contentful
export const JobEntrySchema = z.object({
  sys: z.object({
    id: z.string(),
  }),
  fields: z.object({
    title: z.string(),
    companyName: z.string(),
    summary: z.string(),
    achievements: z.array(z.string()).optional(),
    techAndSkills: z.string().optional(),
    employmentStart: z.string(),
    employmentEnd: z.string().optional().default("Present"),
  }),
});

export const JobEntriesSchema = z.array(JobEntrySchema);

// TS types here:

export type JobEntry = z.infer<typeof JobEntrySchema>;
export type JobEntries = z.infer<typeof JobEntriesSchema>;
