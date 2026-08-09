import { Router } from 'express';
import mongoose from 'mongoose';

const router = Router();
const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];

router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    uptime: process.uptime(),
    db: states[mongoose.connection.readyState] || 'unknown',
    timestamp: new Date().toISOString(),
  });
});

export default router;
