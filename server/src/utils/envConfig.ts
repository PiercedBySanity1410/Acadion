import { z } from 'zod';
import dotenv from 'dotenv';
const envSchema = z.object({
  ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default(8080),
  FRONTEND_URL: z.url().default('http://localhost:3000'),
  DATABASE_URL: z.string().default('postgresql://acadion:acadion%408699@localhost:5432/acadion?schema=public'),
  // API_PREFIX: z.string().default(''),
  // LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
  // CORS_ORIGIN: z.string().default('*'),
  // RATE_LIMIT_WINDOW: z.string().transform(Number).default(900000), // 15 min
  // RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default(100),
  // DB_HOST: z.string().optional(),
  // DB_PORT: z.string().transform(Number).optional(),
  // JWT_SECRET: z.string().optional(),
});
dotenv.config();
const env = envSchema.parse(process.env);

export const config = {
  env: env.ENV,
  port: env.PORT,
  frontendUrl: env.FRONTEND_URL,
  dbUrl: env.DATABASE_URL,
  // apiPrefix: env.API_PREFIX,
  // logLevel: env.LOG_LEVEL,
  // cors: {
  //   origin: env.CORS_ORIGIN,
  // },
  // rateLimit: {
  //   windowMs: env.RATE_LIMIT_WINDOW,
  //   maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
  // },
  // db: {
  //   host: env.DB_HOST,
  //   port: env.DB_PORT,
  // },
  // jwt: {
  //   secret: env.JWT_SECRET,
  // },
} as const;