import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.apiKey = process.env.WEATHER_API_KEY;
    this.baseUrl = 'http://api.weatherapi.com/v1';
  }

  async getWeather(city: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/current.json`, {
        params: {
          key: this.apiKey,
          q: city,
        },
      });

      const data = response.data;
      return {
        temperature: data.current.temp_c,
        humidity: data.current.humidity,
        description: data.current.condition.text,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new NotFoundException('City not found');
      }
      throw error;
    }
  }
} 