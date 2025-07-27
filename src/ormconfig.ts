import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'devuser',
  password: '1234',
  database: 'blog',
  entities: [__dirname + '/**/*.entity.{ts,js}'],
  synchronize: true, // don't use in production!
};

export default ormConfig;
