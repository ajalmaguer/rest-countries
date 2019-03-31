import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { WrapperComponent } from './wrapper/wrapper.component';
import { CountryListComponent } from './country-list/country-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WrapperComponent, CountryListComponent],
  imports: [CommonModule, SharedModule, RouterModule, HttpClientModule, ReactiveFormsModule]
})
export class CoreModule {}
