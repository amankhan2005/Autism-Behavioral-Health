import { Router } from 'express';
import { formLimiter } from '../middleware/rateLimiter.js';
import { honeypot } from '../middleware/honeypot.js';
import { validate } from '../middleware/validate.js';
import { newsletterSchema } from '../validation/newsletter.schema.js';
import { subscribe } from '../controllers/newsletter.controller.js';

const router = Router();
router.post('/newsletter', formLimiter, honeypot, validate(newsletterSchema), subscribe);
export default router;
