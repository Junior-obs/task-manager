import {
  Controller,
  Get,
  Query,
  UsePipes,
  UseFilters,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';

@Controller('dashboard')
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  async getSummary(
    @Query('city') city: string = 'Dakar',
    @Query('country') country: string = 'Senegal',
    @Query('currency') currency: string = 'USD',
  ) {
    return this.dashboardService.getSummary(city, country, currency);
  }

  @Get('weather')
  async getWeather(@Query('city') city: string) {
    return this.dashboardService.getWeather(city);
  }

  @Get('country')
  async getCountry(@Query('name') name: string) {
    return this.dashboardService.getCountry(name);
  }

  @Get('exchange')
  async getExchangeRates(@Query('base') base: string = 'USD') {
    return this.dashboardService.getExchangeRates(base);
  }

  @Get('convert')
  async convertCurrency(
    @Query('amount') amount: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.dashboardService.convertCurrency(Number(amount), from, to);
  }
}
