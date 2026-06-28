import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountriesService {
  private readonly apiUrl = 'https://restcountries.com/v3.1';

  async getAllCountries(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/all?fields=name,capital,population,region,flags`);

      return response.data.map((country: any) => ({
        name: country.name.common,
        capital: country.capital?.[0] || 'N/A',
        population: country.population,
        region: country.region,
        flag: country.flags?.png,
      }));
    } catch (error) {
      throw new HttpException(
        'Erreur lors de la récupération des pays',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getCountryByName(name: string): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/name/${name}`);
      const country = response.data[0];

      return {
        name: country.name.common,
        officialName: country.name.official,
        capital: country.capital?.[0] || 'N/A',
        population: country.population,
        region: country.region,
        subregion: country.subregion,
        languages: Object.values(country.languages || {}),
        currencies: Object.values(country.currencies || {}).map((c: any) => c.name),
        flag: country.flags?.png,
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          `Pays "${name}" introuvable`,
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Erreur lors de la récupération du pays',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}