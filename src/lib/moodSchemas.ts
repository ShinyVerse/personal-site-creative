import { z } from 'zod'

export const moodEntrySchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid(),
  mood_colour: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Must be a valid hex color code'),
  notes: z.string().optional(),
  created_at: z.string().datetime().optional(),
})

export type MoodEntry = z.infer<typeof moodEntrySchema>

