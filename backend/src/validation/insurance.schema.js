import { z } from 'zod';
import { nameField, emailField, phoneField } from './common.js';

export const insuranceSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField,
  insuranceProvider: z.string().trim().min(2, 'Please enter your insurance provider.').max(120),
  memberId: z.string().trim().max(80).optional().or(z.literal('')),
  serviceInterest: z.string().trim().max(120).optional().or(z.literal('')),
  message: z.string().trim().max(4000).optional().or(z.literal('')),
  consent: z.boolean().optional().default(false),
});
