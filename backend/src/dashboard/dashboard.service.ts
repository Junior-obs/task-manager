import { Injectable } from '@nestjs/common';
import { WeatherService } from '../external-api/weather.service';
import { CountriesService } from '../external-api/countries.service';
import { ExchangeService } from '../external-api/exchange.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly countriesService: CountriesService,
    private readonly exchangeService: ExchangeService,
  ) {}

  async getSummary(city: string, country: string, currency: string) {
    const [weather, countryInfo, rates] = await Promise.all([
      this.weatherService.getWeather(city),
      this.countriesService.getCountryByName(country),
      this.exchangeService.getRates(currency),
    ]);

    return {
      weather,
      country: countryInfo,
      exchange: rates,
      generatedAt: new Date().toISOString(),
    };
  }

  async getWeather(city: string) {
    return this.weatherService.getWeather(city);
  }

  async getCountry(name: string) {
    return this.countriesService.getCountryByName(name);
  }

  async getExchangeRates(base: string) {
    return this.exchangeService.getRates(base);
  }

  async convertCurrency(amount: number, from: string, to: string) {
    return this.exchangeService.convert(amount, from, to);
  }
}
