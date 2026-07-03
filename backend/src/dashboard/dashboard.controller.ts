import { Controller, Get, Query, UsePipes, UseFilters } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ValidationPipe } from '../common/pipes/validation.pipe';
import { HttpExceptionFilter } from '../common/filters/http-exception.filters';

@Controller('dashboard')
@UseFilters(HttpExceptionFilter)
@UsePipes(ValidationPipe)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary(
    @Query('city') city: string = 'Dakar',
    @Query('country') country: string = 'Senegal',
    @Query('currency') currency: string = 'USD',
  ) {
    return this.dashboardService.getSummary(city, country, currency);
  }

  @Get('weather')
  getWeather(@Query('city') city: string) {
    return this.dashboardService.getWeather(city);
  }

  @Get('country')
  getCountry(@Query('name') name: string) {
    return this.dashboardService.getCountry(name);
  }

  @Get('exchange')
  getExchangeRates(@Query('base') base: string = 'USD') {
    return this.dashboardService.getExchangeRates(base);
  }

  @Get('convert')
  convertCurrency(
    @Query('amount') amount: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.dashboardService.convertCurrency(Number(amount), from, to);
  }
}
