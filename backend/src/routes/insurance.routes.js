import { Router } from 'express';
import { formLimiter } from '../middleware/rateLimiter.js';
import { honeypot } from '../middleware/honeypot.js';
import { validate } from '../middleware/validate.js';
import { insuranceSchema } from '../validation/insurance.schema.js';
import { submitInsurance } from '../controllers/insurance.controller.js';

const router = Router();
router.post('/insurance-inquiry', formLimiter, honeypot, validate(insuranceSchema), submitInsurance);
export default router;
