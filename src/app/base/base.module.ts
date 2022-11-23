import { NgModule } from '@angular/core';

import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  exports: [
    MaterialModule,
    FlexLayoutModule
  ]
})
export class BaseModule { }
