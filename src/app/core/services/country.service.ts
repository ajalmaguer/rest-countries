import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

import { Country, CountryListHash } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl = 'https://restcountries.eu/rest/v2';
  countries$ = new BehaviorSubject<Country[]>([]);
  private countryList: Country[];
  private countryListHash: CountryListHash;
  private displayNumber = 15;

  constructor(private http: HttpClient) {}

  getAllCountries() {
    this.http
      .get<Country[]>(`${this.baseUrl}/all`)
      .pipe(
        tap(countries => {
          this.countryList = countries;
          this.countryListHash = this.buildHashMap(countries);
        }),
        tap(countries => this.countries$.next(countries.slice(0, this.displayNumber)))
      )
      .subscribe();
  }

  buildHashMap(countries: Country[]): CountryListHash {
    const countryHash = {};
    countries.forEach(country => {
      countryHash[country.alpha3Code] = country;
    });

    return countryHash;
  }

  showMoreCountries() {
    this.displayNumber = this.displayNumber + 15;
    this.countries$.next(this.countryList.slice(0, this.displayNumber));
  }

  // Helper functions
  getCountryName(alpha3Code: string): string {
    console.count('getCountryName');
    return this.countryListHash[alpha3Code].name;
  }
}
