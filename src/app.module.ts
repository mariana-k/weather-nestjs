import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { WeatherController } from './controllers/weather.controller';
import { SubscriptionController } from './controllers/subscription.controller';
import { WeatherService } from './services/weather.service';
import { SubscriptionService } from './services/subscription.service';
import { Subscription } from './entities/subscription.entity';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Subscription]),
  ],
  controllers: [WeatherController, SubscriptionController],
  providers: [WeatherService, SubscriptionService],
})
export class AppModule {} 