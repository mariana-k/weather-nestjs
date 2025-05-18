import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query('city') city: string) {
    try {
      return await this.weatherService.getWeather(city);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('City not found');
    }
  }
} 