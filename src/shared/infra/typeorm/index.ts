import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

class DataSourceConfig {
  private env: string | undefined = process.env.NODE_ENV;

  public config(): DataSourceOptions {
    const entitiesPath: string = join(
      __dirname,
      '../../../modules/**/infra/typeorm/entities/*.ts',
    );
    const migrationsPath: string = join(__dirname, './migrations/*.ts');

    if (this.env === 'test') {
      return {
        type: 'sqlite',
        database: ':memory:',
        synchronize: true,
        entities: [entitiesPath],
      };
    }

    return {
      type: 'postgres',
      host: process.env.DATABASE_HOST ?? 'pgsqldatabase',
      port: 5432,
      username: process.env.DATABASE_USERNAME ?? 'postgres',
      password: process.env.DATABASE_PASSWORD ?? 'docker',
      database: process.env.DATABASE_NAME ?? 'salesapi',
      entities: [entitiesPath],
      migrations: [migrationsPath],
    };
  }
}

export const dataSource = new DataSource(new DataSourceConfig().config());
