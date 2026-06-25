import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private readonly apiKey = process.env.WEATHER_API_KEY || 'your_api_key_here';

  async getWeather(city: string): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric',
          lang: 'fr',
        },
      });

      return {
        city: response.data.name,
        country: response.data.sys.country,
        temperature: response.data.main.temp,
        description: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          `Ville "${city}" introuvable`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Erreur lors de la récupération des données météo',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}