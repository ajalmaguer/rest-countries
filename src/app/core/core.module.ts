import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { WrapperComponent } from './wrapper/wrapper.component';
import { CountryListComponent } from './country-list/country-list.component';

@NgModule({
  declarations: [WrapperComponent, CountryListComponent],
  imports: [CommonModule, SharedModule, RouterModule, HttpClientModule]
})
export class CoreModule {}
