import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryService, AppState } from '../services/country.service';
import { Country } from '../interfaces/country.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  pageHeading = 'All Countries';
  state$: Observable<AppState>;

  get totalCountries$() {
    return this.state$.pipe(map(state => state.countries.length));
  }

  get countries$() {
    return this.state$.pipe(
      map(state => {
        return state.countries
          .filter(country => {
            if (!state.islandsOnly) {
              return true;
            }
            return country.borders.length === 0;
          })
          .filter(country => {
            const countryName = country.name.toLowerCase();
            const alpha2Code = country.alpha2Code.toLowerCase();
            const alpha3Code = country.alpha3Code.toLowerCase();
            const filter = state.filter.toLowerCase();
            return (
              countryName.includes(filter) ||
              alpha2Code.includes(filter) ||
              alpha3Code.includes(filter)
            );
          })
          .sort((countryA, countryB) => {
            const nameA = countryA.name.toUpperCase(); // ignore upper and lowercase
            const nameB = countryB.name.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
          .sort((countryA, countryB) => {
            switch (state.borderSort) {
              case 1:
                return countryA.borders.length - countryB.borders.length;
              case 2:
                return countryB.borders.length - countryA.borders.length;
              default:
                return 0;
            }
          })
          .slice(0, state.displayNumber);
      })
    );
  }

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getAllCountries();
    this.state$ = this.countryService.state$;
  }

  trackByFn(index, country: Country) {
    return country.alpha3Code;
  }

  getCountryName(alpha3Code: string): string {
    return this.countryService.getCountryName(alpha3Code);
  }

  showMore() {
    this.countryService.showMoreCountries();
  }

  toggleIslandsOnly() {
    this.countryService.toggleIslandsOnly();
  }

  toggleBorderSort() {
    this.countryService.toggleBorderSort();
  }

  getBorderSortText(sortId: number): string {
    switch (sortId) {
      case 1:
        return 'Ascending';
      case 2:
        return 'Decending';
      default:
        return 'None';
    }
  }
}
