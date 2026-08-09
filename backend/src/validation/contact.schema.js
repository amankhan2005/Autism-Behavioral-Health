import { z } from 'zod';
import { nameField, emailField, phoneField, messageField } from './common.js';

export const contactSchema = z.object({
  fullName: nameField,
  email: emailField,
  phone: phoneField.optional().or(z.literal('')),
  subject: z.string().trim().max(160).optional().or(z.literal('')),
  message: messageField,
  consent: z.boolean().optional().default(false),
});
