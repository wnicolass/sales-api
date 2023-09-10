import 'reflect-metadata';
import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import router from './routes';
import errorHandler from '@shared/errors/ErrorHandler';
import '@shared/typeorm/index';

function setupServer(): void {
  const app = express();
  const PORT = process.env.PORT || 3333;

  app.use(cors());
  app.use(express.json());
  app.use(router);
  app.use(errorHandler.handle);
  app.listen(3333, () => console.log(`🚀 Server listening on port ${PORT}`));
}

setupServer();
