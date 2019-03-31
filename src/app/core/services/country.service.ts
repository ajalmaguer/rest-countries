import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Country, CountryListHash } from '../interfaces/country.interface';

interface AppState {
  filter: string;
  displayNumber: number;
  countries: Country[];
  countryListHash: CountryListHash;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // tslint:disable-next-line:variable-name
  private _state$ = new BehaviorSubject<AppState>({
    filter: '',
    displayNumber: 15,
    countries: [],
    countryListHash: {}
  });
  public readonly state$ = this._state$.asObservable();

  private baseUrl = 'https://restcountries.eu/rest/v2';

  constructor(private http: HttpClient) {}

  getAllCountries() {
    this.http
      .get<Country[]>(`${this.baseUrl}/all`)
      .pipe(
        tap(countries => {
          const state = {
            ...this._state$.getValue(),
            countries,
            countryListHash: this.buildHashMap(countries)
          };
          this._state$.next(state);
        })
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
    const state = this._state$.getValue();
    this._state$.next({
      ...state,
      displayNumber: state.displayNumber + 15
    });
  }

  filterCountries(filterString) {
    const state = this._state$.getValue();
    this._state$.next({
      ...state,
      filter: filterString,
      displayNumber: 15
    });
  }

  // Helper functions
  getCountryName(alpha3Code: string): string {
    return this._state$.getValue().countryListHash[alpha3Code].name;
  }
}
