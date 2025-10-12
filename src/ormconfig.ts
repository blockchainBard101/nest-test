import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'nestjs',
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: true, // don't use in production!
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/**/*.ts']

};

const AppDataSource = new DataSource(ormConfig);

export {AppDataSource};

export default ormConfig;
