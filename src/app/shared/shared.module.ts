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

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    NavbarComponent,
    TopBarComponent,
    FooterComponent,
    PageHeadingComponent,
    CardComponent,
    CardHeaderDirective,
    CardBodyDirective
  ],
  exports: [
    NavbarComponent,
    TopBarComponent,
    FooterComponent,
    PageHeadingComponent,
    CardComponent,
    CardHeaderDirective,
    CardBodyDirective
  ]
})
export class SharedModule {}
