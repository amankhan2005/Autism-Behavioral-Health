import rateLimit from 'express-rate-limit';
import { env } from '../config/env.js';

const message = { success: false, message: 'Too many requests. Please try again later.' };

// Generous global limiter across the whole API.
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message,
});

// Strict limiter for form submissions (anti-spam).
export const formLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  message,
});
