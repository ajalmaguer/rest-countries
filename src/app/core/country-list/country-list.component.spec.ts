import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CountryListComponent } from './country-list.component';
import { PageHeadingComponent } from 'src/app/shared/page-heading/page-heading.component';
import { CardComponent } from 'src/app/shared/card/card.component';
import { CountryCardComponent } from 'src/app/shared/country-card/country-card.component';

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
});
