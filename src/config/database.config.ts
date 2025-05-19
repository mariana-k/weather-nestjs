import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Subscription } from '../entities/subscription.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Subscription],
  synchronize: process.env.NODE_ENV !== 'production',
  migrations: ['dist/migrations/*.js'],
  migrationsRun: true,
  ssl: {
    rejectUnauthorized: false
  },
  connectTimeoutMS: 10000, // 10 seconds
}; 