import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from './logger.js';

mongoose.set('strictQuery', true);

export async function connectDB() {
  mongoose.connection.on('connected', () => logger.info('MongoDB connected'));
  mongoose.connection.on('error', (err) => logger.error({ err }, 'MongoDB error'));
  mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'));

  await mongoose.connect(env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  return mongoose.connection;
}

export async function disconnectDB() {
  await mongoose.connection.close();
}
