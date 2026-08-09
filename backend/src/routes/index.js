import { Router } from 'express';
import health from './health.routes.js';
import contact from './contact.routes.js';
import careRequest from './careRequest.routes.js';
import insurance from './insurance.routes.js';
import newsletter from './newsletter.routes.js';

const router = Router();
router.use(health);
router.use(contact);
router.use(careRequest);
router.use(insurance);
router.use(newsletter);

export default router;
