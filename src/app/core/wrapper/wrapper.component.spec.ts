import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperComponent } from './wrapper.component';
import { CountryService } from '../services/country.service';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { CardComponent } from 'src/app/shared/card/card.component';

class CountryServiceStub {
  filterCountries() {}
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'router-outlet',
  template: ''
})
class RouterOutletStubComponent {}

@Component({
  selector: 'app-top-bar',
  template: ''
})
class TopbarStubComponent {}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ul[appNavbar]',
  template: ''
})
class NavbarComponentStubComponent {
  @Input() navItems;
}

describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        WrapperComponent,
        RouterOutletStubComponent,
        FooterComponent,
        NavbarComponentStubComponent,
        TopbarStubComponent,
        CardComponent
      ],
      providers: [{ provide: CountryService, useClass: CountryServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
