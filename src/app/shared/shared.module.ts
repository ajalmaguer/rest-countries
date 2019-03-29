import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { FooterComponent } from './footer/footer.component';
import { PageHeadingComponent } from './page-heading/page-heading.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    NavbarComponent,
    TopBarComponent,
    FooterComponent,
    PageHeadingComponent
  ],
  exports: [
    NavbarComponent,
    TopBarComponent,
    FooterComponent,
    PageHeadingComponent
  ]
})
export class SharedModule {}
