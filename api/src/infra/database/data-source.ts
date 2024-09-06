import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { MainSeeder } from './main-seeder';
/** Como o seeder não tem acesso ao ConfigModule
 e também precisa destes dados do arquivo .env, é necessário que seja feita essa chamada */
import * as dotenv from 'dotenv';
dotenv.config();

export const ormOptions = {
  type: process.env.DATABASE_TYPE,
  url: process.env.DATABASE_URL,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.model{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  connection: {
    options: `project=${process.env.ENDPOINT_ID}`,
  },
  ssl: false,
  seeds: [MainSeeder],
} as DataSourceOptions;

export const AppDataSource = new DataSource(ormOptions);
