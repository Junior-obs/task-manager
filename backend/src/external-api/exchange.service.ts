import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExchangeService {
  private readonly apiUrl = 'https://api.exchangerate-api.com/v4/latest';

  async getRates(baseCurrency: string = 'USD'): Promise<any> {
    try {
      const response = await axios.get(
        `${this.apiUrl}/${baseCurrency.toUpperCase()}`,
      );

      return {
        base: response.data.base,
        date: response.data.date,
        rates: response.data.rates,
      };
    } catch (error) {
      if (error.response?.status === 404) {
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

  async convert(amount: number, from: string, to: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${from.toUpperCase()}`);
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
