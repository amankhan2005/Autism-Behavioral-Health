import { Router } from 'express';
import { formLimiter } from '../middleware/rateLimiter.js';
import { honeypot } from '../middleware/honeypot.js';
import { validate } from '../middleware/validate.js';
import { careRequestSchema } from '../validation/careRequest.schema.js';
import { submitCareRequest } from '../controllers/careRequest.controller.js';

const router = Router();
router.post('/schedule-care', formLimiter, honeypot, validate(careRequestSchema), submitCareRequest);
export default router;
