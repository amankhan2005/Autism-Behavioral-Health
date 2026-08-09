import { ok } from '../utils/ApiResponse.js';
import { logger } from '../config/logger.js';

// Bots fill hidden fields. If present, silently accept (200) but drop the request.
const TRAP_FIELDS = ['company', 'website', 'fax'];

export const honeypot = (req, res, next) => {
  const tripped = TRAP_FIELDS.some((f) => req.body?.[f]);
  if (tripped) {
    logger.warn({ ip: req.ip }, 'Honeypot tripped — dropping submission');
    return ok(res, 200, 'Thank you. We\u2019ll be in touch shortly.');
  }
  // Remove trap fields so they never reach validation/DB.
  TRAP_FIELDS.forEach((f) => delete req.body?.[f]);
  next();
};
