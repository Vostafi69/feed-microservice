import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_MIGRATIONS_HOST,
  database: process.env.DATABASE,
  synchronize: false,
  logging: false,
  logger: 'file',
  migrationsRun: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/infrastructure/database/migrations/*{.ts,.js}'],
});
