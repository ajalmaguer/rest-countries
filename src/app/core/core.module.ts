import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [WrapperComponent],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class CoreModule {}
