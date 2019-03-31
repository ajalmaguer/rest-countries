import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';
import { CardComponent } from './card/card.component';
import { CardHeaderDirective } from './card/card-header.directive';
import { CardBodyDirective } from './card/card-body.directive';
import { RouterModule } from '@angular/router';
import { CountryCardComponent } from './country-card/country-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  declarations: [
    NavbarComponent,
    TopBarComponent,
    FooterComponent,
    PageHeadingComponent,
    CardComponent,
    CardHeaderDirective,
    CardBodyDirective,
    CountryCardComponent
  ],
  exports: [
    NavbarComponent,
    TopBarComponent,
    FooterComponent,
    PageHeadingComponent,
    CardComponent,
    CardHeaderDirective,
    CardBodyDirective,
    CountryCardComponent
  ]
})
export class SharedModule {}
