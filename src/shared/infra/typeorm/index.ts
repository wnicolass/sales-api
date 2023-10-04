import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';

class DataSourceConfig {
  private env: string | undefined = process.env.NODE_ENV;

  public config(): DataSourceOptions {
    const entitiesPath: string = join(__dirname, 'entities', 'index.ts');
    const migrationsPath: string = join(__dirname, 'migrations');

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
      host: 'pgsqldatabase',
      port: 5432,
      username: 'postgres',
      password: 'docker',
      database: 'salesapi',
      entities: [entitiesPath],
      migrations: [migrationsPath],
    };
  }
}

export const dataSource = new DataSource(new DataSourceConfig().config());
