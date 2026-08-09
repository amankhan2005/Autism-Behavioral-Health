import pino from 'pino';
import { env, isProd, isTest } from './env.js';

export const logger = pino({
  level: isTest ? 'silent' : env.LOG_LEVEL,
  transport: isProd || isTest ? undefined : { target: 'pino-pretty', options: { colorize: true, translateTime: 'SYS:HH:MM:ss' } },
  base: undefined,
});
