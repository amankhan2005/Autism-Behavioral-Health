import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(5000),
  LOG_LEVEL: z.string().default('info'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
  RESEND_API_KEY: z.string().optional().default(''),
  EMAIL_FROM: z.string().default('Autism & Behavioral Health <noreply@example.com>'),
  EMAIL_ADMIN: z.string().default('intake@example.com'),
  RATE_LIMIT_WINDOW_MS: z.coerce.number().default(15 * 60 * 1000),
  RATE_LIMIT_MAX: z.coerce.number().default(8),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid environment configuration:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;
export const isProd = env.NODE_ENV === 'production';
export const isTest = env.NODE_ENV === 'test';
export const corsOrigins = env.CLIENT_ORIGIN.split(',').map((s) => s.trim()).filter(Boolean);
export const emailEnabled = Boolean(env.RESEND_API_KEY);
