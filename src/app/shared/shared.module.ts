import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroFilterComponent } from './hero-filter/hero-filter.component';
import { BaseModule } from '../base/base.module';
4
@NgModule({
  declarations: [
    HeroFilterComponent
  ],
  imports: [
    BaseModule,
    CommonModule
  ],
  exports: [
    HeroFilterComponent
  ]
})
export class SharedModule { }
