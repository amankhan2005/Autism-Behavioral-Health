import { z } from 'zod';
import { nameField, emailField, phoneField } from './common.js';

export const careRequestSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  childFirstName: z.string().trim().max(80).optional().or(z.literal('')),
  childAgeRange: z.enum(['0-2', '3-5', '6-9', '10-13', '14-17'], {
    errorMap: () => ({ message: 'Please select an age range.' }),
  }),
  serviceInterest: z.string().trim().max(120).optional().or(z.literal('')),
  preferredContact: z.enum(['phone', 'email']).default('phone'),
  preferredTime: z.enum(['morning', 'afternoon', 'evening', 'anytime']).default('anytime'),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  consent: z.boolean().optional().default(false),
});
