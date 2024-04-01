import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export function getTypeOrmConfig(config: ConfigService): TypeOrmModuleOptions {
  return {
    type: 'postgres',

    host: config.get('POSTGRES_HOST'),
    port: parseInt(config.get('POSTGRES_PORT')),
    username: config.get('POSTGRES_USER'),
    password: config.get('POSTGRES_PASSWORD'),
    database: config.get('POSTGRES_DATABASE'),
    entities: ['src/modules/**/*.entity.js'],
    migrationsTableName: 'migration',
    migrations: ['src/migrations/*.js','src/migrations/*.ts'],
    autoLoadEntities: true,
    ssl: false
  };
}
