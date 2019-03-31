import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryService } from '../services/country.service';
import { Country } from '../interfaces/country.interface';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {
  pageHeading = 'All Countries';
  countries$: Observable<Country[]>;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.countryService.getAllCountries();
    this.countries$ = this.countryService.state$.pipe(
      map(state => {
        return state.countries
          .filter(country => {
            const countryName = country.name.toLowerCase();
            const filter = state.filter.toLowerCase();
            return countryName.indexOf(filter) > -1;
          })
          .slice(0, state.displayNumber);
      })
    );
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
}
