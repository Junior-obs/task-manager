import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CountriesService } from './countries.service';
import { ExchangeService } from './exchange.service';

@Module({
  providers: [WeatherService, CountriesService, ExchangeService],
  exports: [WeatherService, CountriesService, ExchangeService],
})
export class ExternalApiModule {}
