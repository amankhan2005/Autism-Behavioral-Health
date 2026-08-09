import { z } from 'zod';
export const careSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.string().trim().email('Please enter a valid email.').max(160),
  phone: z.string().trim().min(7, 'Please enter a valid phone number.').max(40),
  childFirstName: z.string().trim().max(80).optional().or(z.literal('')),
  childAgeRange: z.enum(['0-2', '3-5', '6-9', '10-13', '14-17'], { errorMap: () => ({ message: 'Please select an age range.' }) }),
  serviceInterest: z.string().trim().max(120).optional().or(z.literal('')),
  preferredContact: z.enum(['phone', 'email']).default('phone'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']).default('anytime'),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  consent: z.boolean().optional().default(false),
});
export const careDefaults = {
  fullName: '', email: '', phone: '', childFirstName: '', childAgeRange: '',
  serviceInterest: '', preferredContact: 'phone', preferredTime: 'anytime', message: '', consent: false,
};
