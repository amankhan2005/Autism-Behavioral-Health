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

  // Proxy configuration
  app.set('trust proxy', 1);

  // Security headers
  app.use(helmet());

  // CORS
  app.use(
    cors({
      origin(origin, callback) {
        // Allow requests without Origin
        // (curl, Postman, server-to-server, etc.)
        if (!origin) {
          return callback(null, true);
        }

        // Allow whitelisted websites
        if (corsOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error(`CORS blocked origin: ${origin}`));
      },

      methods: [
        'GET',
        'POST',
        'PUT',
        'PATCH',
        'DELETE',
        'OPTIONS',
      ],

      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Origin',
        'X-Requested-With',
      ],

      credentials: false,

      optionsSuccessStatus: 204,
    })
  );

  // Compression
  app.use(compression());

  // Body parsers
  app.use(express.json({ limit: '10kb' }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: '10kb',
    })
  );

  // MongoDB sanitization
  app.use(mongoSanitize());

  // Custom sanitization
  app.use(sanitizeBody);

  // HTTP logging
  if (!isTest) {
    app.use(
      pinoHttp({
        logger,
      })
    );
  }

  // Rate limiting
  app.use(globalLimiter);

  // Root endpoint
  app.get('/', (_req, res) => {
    res.json({
      success: true,
      service: 'ABH API',
      docs: '/api/v1/health',
    });
  });

  // API routes
  app.use('/api/v1', apiRouter);

  // 404
  app.use(notFound);

  // Error handler
  app.use(errorHandler);

  return app;
}