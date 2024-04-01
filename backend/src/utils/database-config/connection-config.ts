import * as dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  type: 'postgres',

  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  ssl: false,
    entities: ['src/modules/**/*.entity.ts'],
    migrationsTableName: 'migration',
    migrations: ['src/migrations/*.ts'],
});
