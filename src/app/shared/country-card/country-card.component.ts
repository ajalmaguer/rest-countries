import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Country } from 'src/app/core/interfaces/country.interface';
import { CountryService } from 'src/app/core/services/country.service';

@Component({
  selector: 'app-country-card',
  templateUrl: './country-card.component.html',
  styleUrls: ['./country-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountryCardComponent implements OnInit {
  @Input() country: Country = null;

  constructor(private countryService: CountryService) { }

  ngOnInit() {
  }

  getCountryName(alpha3Code: string): string {
    return this.countryService.getCountryName(alpha3Code);
  }

}
