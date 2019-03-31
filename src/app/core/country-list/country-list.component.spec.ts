import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CountryListComponent } from './country-list.component';
import { PageHeadingComponent } from 'src/app/shared/page-heading/page-heading.component';
import { CardComponent } from 'src/app/shared/card/card.component';
import { CountryCardComponent } from 'src/app/shared/country-card/country-card.component';
import { Country } from '../interfaces/country.interface';

describe('CountryListComponent', () => {
  let component: CountryListComponent;
  let fixture: ComponentFixture<CountryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        CountryListComponent,
        PageHeadingComponent,
        CardComponent,
        CountryCardComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onlyIslandsFilter', () => {});

  describe('#searchBarFilter', () => {
    it('should not filter if value is ""', () => {
      const countries = [
        { name: 'first', alpha2Code: 'ab', alpha3Code: 'lmn' },
        { name: 'second', alpha2Code: 'de', alpha3Code: 'xyz' }
      ] as Country[];

      const expectedOutput = [
        { name: 'first', alpha2Code: 'ab', alpha3Code: 'lmn' },
        { name: 'second', alpha2Code: 'de', alpha3Code: 'xyz' }
      ] as Country[];

      expect(countries.filter(component.searchBarFilter(''))).toEqual(
        expectedOutput
      );
    });

    it('should filter by name', () => {
      const countries = [
        { name: 'first', alpha2Code: 'ab', alpha3Code: 'lmn' },
        { name: 'second', alpha2Code: 'de', alpha3Code: 'xyz' }
      ] as Country[];

      const expectedOutput = [
        { name: 'first', alpha2Code: 'ab', alpha3Code: 'lmn' }
      ] as Country[];

      expect(countries.filter(component.searchBarFilter('fir'))).toEqual(
        expectedOutput
      );
    });

    it('should filter by alpha2code', () => {
      const countries = [
        { name: 'first', alpha2Code: 'ab', alpha3Code: 'lmn' },
        { name: 'second', alpha2Code: 'de', alpha3Code: 'xyz' }
      ] as Country[];

      const expectedOutput = [
        { name: 'first', alpha2Code: 'ab', alpha3Code: 'lmn' },
      ] as Country[];

      expect(countries.filter(component.searchBarFilter('ab'))).toEqual(
        expectedOutput
      );
    });

    it('should filter by alpha3code', () => {
      const countries = [
        { name: 'first', alpha2Code: 'ab', alpha3Code: 'lmn' },
        { name: 'second', alpha2Code: 'de', alpha3Code: 'xyz' }
      ] as Country[];

      const expectedOutput = [
        { name: 'first', alpha2Code: 'ab', alpha3Code: 'lmn' },
      ] as Country[];

      expect(countries.filter(component.searchBarFilter('lm'))).toEqual(
        expectedOutput
      );
    });
  });

  describe('#alphabeticalOrder', () => {
    it('should sort', () => {
      const countries = [{ name: 'c' }, { name: 'b' }, { name: 'a' }];
      expect(countries.sort(component.alphabeticalOrder())).toEqual([
        { name: 'a' },
        { name: 'b' },
        { name: 'c' }
      ]);
    });
  });

  describe('#sortByOrderNumber', () => {
    it('should not sort if flag is 0', () => {
      const countries = [
        { borders: ['a', 'b', 'c'] },
        { borders: [] }
      ] as Country[];

      const expectedOrder = [
        { borders: ['a', 'b', 'c'] },
        { borders: [] }
      ] as Country[];

      expect(countries.sort(component.sortByBorderNumber(0))).toEqual(
        expectedOrder
      );
    });

    it('should not sort ascending flag is 1', () => {
      const countries = [
        { borders: ['a', 'b', 'c'] },
        { borders: [] }
      ] as Country[];

      const expectedOrder = [
        { borders: [] },
        { borders: ['a', 'b', 'c'] }
      ] as Country[];

      expect(countries.sort(component.sortByBorderNumber(1))).toEqual(
        expectedOrder
      );
    });

    it('should not sort decending flag is 2', () => {
      const countries = [
        { borders: [] },
        { borders: ['a', 'b', 'c'] }
      ] as Country[];

      const expectedOrder = [
        { borders: ['a', 'b', 'c'] },
        { borders: [] }
      ] as Country[];

      expect(countries.sort(component.sortByBorderNumber(2))).toEqual(
        expectedOrder
      );
    });
  });

  describe('#sortByPopulation', () => {
    it('should not sort if flag is 0', () => {
      const countries = [{ population: 10 }, { population: 20 }] as Country[];

      const expectedOrder = [
        { population: 10 },
        { population: 20 }
      ] as Country[];

      expect(countries.sort(component.sortByPopulation(0))).toEqual(
        expectedOrder
      );
    });

    it('should not sort ascending flag is 1', () => {
      const countries = [{ population: 20 }, { population: 10 }] as Country[];

      const expectedOrder = [
        { population: 10 },
        { population: 20 }
      ] as Country[];

      expect(countries.sort(component.sortByPopulation(1))).toEqual(
        expectedOrder
      );
    });

    it('should not sort descending flag is 2', () => {
      const countries = [{ population: 10 }, { population: 20 }] as Country[];

      const expectedOrder = [
        { population: 20 },
        { population: 10 }
      ] as Country[];

      expect(countries.sort(component.sortByPopulation(2))).toEqual(
        expectedOrder
      );
    });
  });

  describe('#sortByArea', () => {
    it('should not sort if flag is 0', () => {
      const countries = [{ area: 100 }, { area: 200 }] as Country[];

      const expectedOrder = [{ area: 100 }, { area: 200 }] as Country[];

      expect(countries.sort(component.sortByArea(0))).toEqual(expectedOrder);
    });

    it('should not sort ascending if flag is 1', () => {
      const countries = [{ area: 200 }, { area: 100 }] as Country[];

      const expectedOrder = [{ area: 100 }, { area: 200 }] as Country[];

      expect(countries.sort(component.sortByArea(1))).toEqual(expectedOrder);
    });

    it('should not sort descending if flag is 2', () => {
      const countries = [{ area: 100 }, { area: 200 }] as Country[];

      const expectedOrder = [{ area: 200 }, { area: 100 }] as Country[];

      expect(countries.sort(component.sortByArea(2))).toEqual(expectedOrder);
    });
  });
});
