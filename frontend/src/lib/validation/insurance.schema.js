import { z } from 'zod';
export const insuranceSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('Please enter a valid email.').max(160),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(40),
  insuranceProvider: z.string().trim().min(2, 'Please enter your insurance provider.').max(120),
  memberId: z.string().trim().max(80).optional().or(z.literal('')),
  serviceInterest: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  consent: z.boolean().optional().default(false),
});
export const insuranceDefaults = {
  fullName: '', email: '', phone: '', insuranceProvider: '', memberId: '', serviceInterest: '', message: '', consent: false,
};
