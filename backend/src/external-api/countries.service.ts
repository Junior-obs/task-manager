import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';

export interface CountrySummary {
  name: string;
  capital: string;
  population: number;
  region: string;
  flag: string | undefined;
}

export interface CountryDetail {
  name: string;
  officialName: string;
  capital: string;
  population: number;
  region: string;
  subregion: string;
  languages: unknown[];
  currencies: string[];
  flag: string | undefined;
}

interface RestCountriesEntry {
  name: { common: string; official: string };
  capital?: string[];
  population: number;
  region: string;
  subregion: string;
  flags?: { png: string };
  languages?: Record<string, string>;
  currencies?: Record<string, { name: string }>;
}

@Injectable()
export class CountriesService {
  private readonly apiUrl = 'https://restcountries.com/v3.1';

  async getAllCountries(): Promise<CountrySummary[]> {
    try {
      const response = await axios.get<RestCountriesEntry[]>(
        `${this.apiUrl}/all?fields=name,capital,population,region,flags`,
      );

      return response.data.map((country) => ({
        name: country.name.common,
        capital: country.capital?.[0] ?? 'N/A',
        population: country.population,
        region: country.region,
        flag: country.flags?.png,
      }));
    } catch {
      throw new HttpException(
        'Erreur lors de la récupération des pays',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getCountryByName(name: string): Promise<CountryDetail> {
    try {
      const response = await axios.get<RestCountriesEntry[]>(
        `${this.apiUrl}/name/${name}`,
      );
      const country = response.data[0];

      return {
        name: country.name.common,
        officialName: country.name.official,
        capital: country.capital?.[0] ?? 'N/A',
        population: country.population,
        region: country.region,
        subregion: country.subregion,
        languages: Object.values(country.languages ?? {}),
        currencies: Object.values(country.currencies ?? {}).map((c) => c.name),
        flag: country.flags?.png,
      };
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
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
