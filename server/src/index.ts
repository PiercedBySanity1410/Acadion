import express from 'express';
import type { Application } from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { config } from './utils/envConfig.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { appRouter } from './trpc/router.js';
import { createContext } from './trpc/context.js';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as pino from 'pino-http';
import { logger } from './utils/logger.js';

const app: Application = express();
app.use(cookieParser());

// Middleware
app.use(
  pino.pinoHttp({
    logger,
    customLogLevel: () => 'info',
    serializers: {
      req(req) {
        return {
          method: req.method,
          url: req.url,
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
    quietReqLogger: true,
    autoLogging: true,
  }),
);

app.use(
  helmet({
    contentSecurityPolicy: false, // Disable if using inline scripts
    crossOriginEmbedderPolicy: false,
  }),
);

const allowedOrigins = [config.frontendUrl];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// tRPC endpoint
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

// Error handling (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// const createUserSchema = z.object({
//   username: z.string().min(3),
//   email: z.string().email(),
//   age: z.number().int().positive(),
// });

// app.post(
//   '/users',
//   validateRequest(createUserSchema),
//   (req, res) => {
//     // At this point, req.body is guaranteed to match the schema
//     res.send({ success: true, data: req.body });
//   }
// );

// Start server
const server = app.listen(config.port, () => {
  logger.info(`🚀 Server running on http://localhost:${config.port}`);
  logger.info(`📡 tRPC endpoint: http://localhost:${config.port}/trpc`);
  logger.info(`📦 Environment: ${config.env}`);
  logger.info(`🔧 Node version: ${process.version}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});
