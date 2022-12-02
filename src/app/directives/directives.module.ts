import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapitalizeDirective } from './capitalize.directive';

@NgModule({
  declarations: [
    CapitalizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CapitalizeDirective
  ]
})
export class DirectivesModule { }
