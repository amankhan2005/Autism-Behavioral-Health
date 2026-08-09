import { ApiError } from '../utils/ApiError.js';
import { isProd } from '../config/env.js';
import { logger } from '../config/logger.js';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const status = error.statusCode || 500;
    error = new ApiError(status, error.message || 'Something went wrong.', error.details);
    error.isOperational = status < 500;
  }
  if (!error.isOperational || error.statusCode >= 500) {
    logger.error({ err, path: req.originalUrl }, 'Request failed');
  }
  res.status(error.statusCode).json({
    success: false,
    message: error.statusCode >= 500 && isProd ? 'Something went wrong on our end.' : error.message,
    ...(error.details && { errors: error.details }),
  });
};
