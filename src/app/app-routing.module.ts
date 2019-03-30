import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WrapperComponent } from './core/wrapper/wrapper.component';
import { CountryListComponent } from './core/country-list/country-list.component';

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent,
    children: [{ path: '', component: CountryListComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
