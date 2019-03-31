import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
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

  get filteredCountries$() {
    return this.state$.pipe(
      map(state => {
        return state.countries
          .filter(this.onlyIslandsFilter(state.islandsOnly))
          .filter(this.searchBarFilter(state.filter))
          .sort(this.alphabeticalOrder())
          .sort(this.sortByBorderNumber(state.borderSort))
          .sort(this.sortByPopulation(state.populationSort))
          .sort(this.sortByArea(state.areaSort));
      })
    );
  }

  get countries$() {
    return combineLatest(this.state$, this.filteredCountries$).pipe(
      map(([state, filteredCountries]) => {
        return filteredCountries.slice(0, state.displayNumber);
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

  togglePopulationSort() {
    this.countryService.togglePopulationSort();
  }

  toggleAreaSort() {
    this.countryService.toggleAreaSort();
  }

  getSortText(sortId: number): string {
    switch (sortId) {
      case 1:
        return 'Ascending';
      case 2:
        return 'Decending';
      default:
        return '';
    }
  }

  // filter and sort functions
  onlyIslandsFilter(islandsOnly: boolean) {
    return country => {
      if (!islandsOnly) {
        return true;
      }
      return country.borders.length === 0;
    };
  }

  searchBarFilter(searchBarValue) {
    return country => {
      const countryName = country.name.toLowerCase();
      const alpha2Code = country.alpha2Code.toLowerCase();
      const alpha3Code = country.alpha3Code.toLowerCase();
      const filter = searchBarValue.toLowerCase();
      return (
        countryName.includes(filter) ||
        alpha2Code.includes(filter) ||
        alpha3Code.includes(filter)
      );
    };
  }

  alphabeticalOrder() {
    return (countryA, countryB) => {
      const nameA = countryA.name.toUpperCase(); // ignore upper and lowercase
      const nameB = countryB.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    };
  }

  sortByBorderNumber(borderSort: number) {
    return (countryA: Country, countryB: Country) => {
      switch (borderSort) {
        case 1:
          return countryA.borders.length - countryB.borders.length;
        case 2:
          return countryB.borders.length - countryA.borders.length;
        default:
          return 0;
      }
    };
  }

  sortByPopulation(populationSort: number) {
    return (countryA: Country, countryB: Country) => {
      switch (populationSort) {
        case 1:
          return countryA.population - countryB.population;
        case 2:
          return countryB.population - countryA.population;
        default:
          return 0;
      }
    };
  }

  sortByArea(areaSort: number) {
    return (countryA: Country, countryB: Country) => {
      switch (areaSort) {
        case 1:
          return countryA.area - countryB.area;
        case 2:
          return countryB.area - countryA.area;
        default:
          return 0;
      }
    };
  }
}
