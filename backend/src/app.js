import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import pinoHttp from 'pino-http';

import { corsOrigins, isTest } from './config/env.js';
import { logger } from './config/logger.js';
import { globalLimiter } from './middleware/rateLimiter.js';
import { sanitizeBody } from './middleware/sanitize.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

export function createApp() {
  const app = express();

  app.set('trust proxy', 1); // Render/Vercel sit behind a proxy — needed for correct req.ip

  app.use(helmet());
  app.use(
    cors({
      origin(origin, cb) {
        // Allow same-origin / server-to-server (no origin) and whitelisted origins.
        if (!origin || corsOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('Not allowed by CORS'));
      },
      methods: ['GET', 'POST'],
      credentials: false,
    })
  );
  app.use(compression());
  app.use(express.json({ limit: '10kb' }));
  app.use(express.urlencoded({ extended: true, limit: '10kb' }));
  app.use(mongoSanitize());
  app.use(sanitizeBody);
  if (!isTest) app.use(pinoHttp({ logger }));
  app.use(globalLimiter);

  app.get('/', (_req, res) => res.json({ success: true, service: 'ABH API', docs: '/api/v1/health' }));
  app.use('/api/v1', apiRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
