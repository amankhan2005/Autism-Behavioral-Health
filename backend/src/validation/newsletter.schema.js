import { z } from 'zod';
import { emailField } from './common.js';

export const newsletterSchema = z.object({ email: emailField });
