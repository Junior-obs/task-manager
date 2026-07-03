import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

export interface ExchangeRatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ExchangeRatesResult {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface ConversionResult {
  from: string;
  to: string;
  amount: number;
  convertedAmount: number;
  rate: number;
  date: string;
}

@Injectable()
export class ExchangeService {
  private readonly apiUrl = 'https://api.exchangerate-api.com/v4/latest';

  async getRates(baseCurrency: string = 'USD'): Promise<ExchangeRatesResult> {
    try {
      const response = await axios.get<ExchangeRatesResponse>(
        `${this.apiUrl}/${baseCurrency.toUpperCase()}`,
      );

      return {
        base: response.data.base,
        date: response.data.date,
        rates: response.data.rates,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new HttpException(
          `Devise "${baseCurrency}" invalide`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Erreur lors de la récupération des taux de change',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async convert(
    amount: number,
    from: string,
    to: string,
  ): Promise<ConversionResult> {
    try {
      const response = await axios.get<ExchangeRatesResponse>(
        `${this.apiUrl}/${from.toUpperCase()}`,
      );
      const rate = response.data.rates[to.toUpperCase()];

      if (!rate) {
        throw new HttpException(
          `Devise cible "${to}" introuvable`,
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        amount,
        convertedAmount: parseFloat((amount * rate).toFixed(2)),
        rate,
        date: response.data.date,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Erreur lors de la conversion de devise',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
