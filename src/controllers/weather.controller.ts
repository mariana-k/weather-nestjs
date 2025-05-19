import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { WeatherService } from '../services/weather.service';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('weather')
@Controller('api/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  @ApiOperation({ summary: 'Get current weather for a city' })
  @ApiQuery({ name: 'city', required: true, type: String })
  @ApiResponse({ 
    status: 200, 
    description: 'Current weather data',
    schema: {
      type: 'object',
      properties: {
        temperature: { type: 'number' },
        humidity: { type: 'number' },
        description: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid request' })
  @ApiResponse({ status: 404, description: 'City not found' })
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