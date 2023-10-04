import express, { Express } from 'express';
import 'express-async-errors';
import { errors } from 'celebrate';
import cors from 'cors';
import '@shared/infra/typeorm/index';
import '@shared/container';
import errorHandler from '@shared/errors/ErrorHandler';
import router from './routes';
import { multerConfig } from '@config/fileUpload';
import { rateLimiter } from './middlewares/RateLimiter';

function makeExpressApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(rateLimiter.limit);
  app.use('/files', express.static(multerConfig.directory));
  app.use(router);
  app.use(errors());
  app.use(errorHandler.handle);

  return app;
}

export const app = makeExpressApp();
