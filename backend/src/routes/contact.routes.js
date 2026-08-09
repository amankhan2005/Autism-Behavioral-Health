import { Router } from 'express';
import { formLimiter } from '../middleware/rateLimiter.js';
import { honeypot } from '../middleware/honeypot.js';
import { validate } from '../middleware/validate.js';
import { contactSchema } from '../validation/contact.schema.js';
import { submitContact } from '../controllers/contact.controller.js';

const router = Router();
router.post('/contact', formLimiter, honeypot, validate(contactSchema), submitContact);
export default router;
