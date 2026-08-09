import { z } from 'zod';
export const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('Please enter a valid email.').max(160),
  phone: z.string().trim().max(40).optional().or(z.literal('')),
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Please add a little more detail.').max(4000),
  consent: z.boolean().optional().default(false),
});
export const contactDefaults = { fullName: '', email: '', phone: '', subject: '', message: '', consent: false };
