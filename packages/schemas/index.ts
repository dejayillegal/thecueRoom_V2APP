import { z } from 'zod';

export const profileSchema = z.object({
  id: z.string(),
  handle: z.string(),
  role: z.enum(['pending', 'verified', 'moderator', 'admin'])
});
export type Profile = z.infer<typeof profileSchema>;
