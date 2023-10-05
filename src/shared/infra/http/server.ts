import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
  const PORT = process.env.PORT ?? 3333;

  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
});
