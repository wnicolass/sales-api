import 'reflect-metadata';
import 'express-async-errors';
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import router from './routes';
import errorHandler from '@shared/errors/ErrorHandler';
import { errors } from 'celebrate';
import '@shared/typeorm/index';
import { multerConfig } from '@config/fileUpload';

function setupServer(): void {
  const app = express();
  const PORT = process.env.PORT || 3333;

  app.use(cors());
  app.use(express.json());
  app.use('/files', express.static(multerConfig.directory));
  app.use(router);
  app.use(errors());
  app.use(errorHandler.handle);
  app.listen(3333, () => console.log(`🚀 Server listening on port ${PORT}`));
}

setupServer();
