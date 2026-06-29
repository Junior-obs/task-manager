import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth('JWT-auth')
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Résumé du tableau de bord', description: 'Agrège météo, informations pays et taux de change' })
  @ApiQuery({ name: 'city', required: false, type: String, example: 'Dakar' })
  @ApiQuery({ name: 'country', required: false, type: String, example: 'Senegal' })
  @ApiQuery({ name: 'currency', required: false, type: String, example: 'USD' })
  @ApiResponse({ status: 200, description: 'Résumé complet' })
  async getSummary(
    @Query('city') city: string = 'Dakar',
    @Query('country') country: string = 'Senegal',
    @Query('currency') currency: string = 'USD',
  ) {
    return this.dashboardService.getSummary(city, country, currency);
  }

  @Get('weather')
  @ApiOperation({ summary: 'Météo', description: 'Retourne la météo d\'une ville via OpenWeatherMap' })
  @ApiQuery({ name: 'city', required: true, type: String, example: 'Dakar' })
  @ApiResponse({ status: 200, description: 'Données météo' })
  @ApiResponse({ status: 404, description: 'Ville introuvable' })
  async getWeather(@Query('city') city: string) {
    return this.dashboardService.getWeather(city);
  }

  @Get('country')
  @ApiOperation({ summary: 'Informations pays', description: 'Retourne les informations d\'un pays via RestCountries' })
  @ApiQuery({ name: 'name', required: true, type: String, example: 'Senegal' })
  @ApiResponse({ status: 200, description: 'Informations pays' })
  @ApiResponse({ status: 404, description: 'Pays introuvable' })
  async getCountry(@Query('name') name: string) {
    return this.dashboardService.getCountry(name);
  }

  @Get('exchange')
  @ApiOperation({ summary: 'Taux de change', description: 'Retourne les taux de change via ExchangeRate-API' })
  @ApiQuery({ name: 'base', required: false, type: String, example: 'USD' })
  @ApiResponse({ status: 200, description: 'Taux de change' })
  async getExchangeRates(@Query('base') base: string = 'USD') {
    return this.dashboardService.getExchangeRates(base);
  }

  @Get('convert')
  @ApiOperation({ summary: 'Conversion de devises', description: 'Convertit un montant d\'une devise à une autre' })
  @ApiQuery({ name: 'amount', required: true, type: Number, example: 100 })
  @ApiQuery({ name: 'from', required: true, type: String, example: 'USD' })
  @ApiQuery({ name: 'to', required: true, type: String, example: 'EUR' })
  @ApiResponse({ status: 200, description: 'Résultat de conversion' })
  async convertCurrency(
    @Query('amount') amount: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.dashboardService.convertCurrency(Number(amount), from, to);
  }
}
