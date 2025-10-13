import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASS ?? '1234',
  database: process.env.DB_NAME ?? 'nestjs',

  // IMPORTANT: don't auto-create tables
  synchronize: false,
  // Let CLI control migrations explicitly
  migrationsRun: false,

  // Avoid loading both TS and JS entity files at once (can double-register)
  entities: [__dirname + '/**/*.entity.ts'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/**/*.ts'],

  logging: ['schema', 'error'], // optional but handy
};

const AppDataSource = new DataSource(ormConfig);

export {AppDataSource};

export default ormConfig;
