import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { WrapperComponent } from './wrapper/wrapper.component';

@NgModule({
  declarations: [WrapperComponent],
  imports: [CommonModule, SharedModule]
})
export class CoreModule {}
