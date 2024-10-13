import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSource = new DataSource({
  type: 'postgres',
  port: 5432,
  username: 'feed',
  password: '2281',
  host: 'localhost',
  database: 'feed',
  synchronize: false,
  logging: false,
  logger: 'file',
  migrationsRun: false,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['src/infrastructure/database/migrations/*{.ts,.js}'],
});
