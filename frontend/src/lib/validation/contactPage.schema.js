import { z } from 'zod';
// UI splits the name; we transform to `fullName` before hitting the existing /contact API.
export const contactPageSchema = z.object({
  firstName: z.string().trim().min(1, 'Please enter your first name.').max(60),
  lastName: z.string().trim().min(1, 'Please enter your last name.').max(60),
  email: z.string().trim().email('Please enter a valid email.').max(160),
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Please add a little more detail.').max(4000),
  consent: z.boolean().optional().default(false),
});
export const contactPageDefaults = { firstName: '', lastName: '', email: '', subject: '', message: '', consent: false };
