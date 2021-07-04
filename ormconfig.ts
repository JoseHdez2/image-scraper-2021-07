/* eslint-disable prettier/prettier */
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const defaultConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true, // TODO set to false
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

// Four different database connections / schemas.
export const config1: SqliteConnectionOptions = { ...defaultConfig, database: 'db1' };
export const config2: SqliteConnectionOptions = { ...defaultConfig, database: 'db2', name: 'schema2' };
export const config3: SqliteConnectionOptions = { ...defaultConfig, database: 'db3', name: 'schema3' };
export const config4: SqliteConnectionOptions = { ...defaultConfig, database: 'db4', name: 'schema4' };

export const testConfig: SqliteConnectionOptions = {
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
};