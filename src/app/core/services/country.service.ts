import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Country, CountryListHash } from '../interfaces/country.interface';

export interface AppState {
  filter: string;
  displayNumber: number;
  countries: Country[];
  countryListHash: CountryListHash;
  islandsOnly: boolean;
  borderSort: number;
  populationSort: number;
  areaSort: number;
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
    countryListHash: {},
    islandsOnly: false,
    borderSort: 0,
    populationSort: 0,
    areaSort: 0
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

  toggleIslandsOnly() {
    const state = this._state$.getValue();
    this._state$.next({
      ...state,
      islandsOnly: !state.islandsOnly
    });
  }

  toggleBorderSort() {
    const state = this._state$.getValue();
    this._state$.next({
      ...state,
      borderSort: (state.borderSort + 1) % 3,
      populationSort: 0,
      areaSort: 0
    });
  }

  togglePopulationSort() {
    const state = this._state$.getValue();
    this._state$.next({
      ...state,
      populationSort: (state.populationSort + 1) % 3,
      borderSort: 0,
      areaSort: 0
    });
  }

  toggleAreaSort() {
    const state = this._state$.getValue();
    this._state$.next({
      ...state,
      areaSort: (state.areaSort + 1) % 3,
      populationSort: 0,
      borderSort: 0
    });
  }

  // Helper functions
  getCountryName(alpha3Code: string): string {
    return this._state$.getValue().countryListHash[alpha3Code].name;
  }
}
