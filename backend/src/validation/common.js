import { z } from 'zod';

export const nameField = z.string().trim().min(2, 'Please enter your name.').max(120);
export const emailField = z.string().trim().toLowerCase().email('Please enter a valid email.').max(160);
export const phoneField = z
  .string()
  .trim()
  .min(7, 'Please enter a valid phone number.')
  .max(40)
  .regex(/^[0-9+()\-.\s]+$/, 'Please enter a valid phone number.');
export const messageField = z.string().trim().min(10, 'Please add a little more detail.').max(4000);
