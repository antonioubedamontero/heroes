import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';
import { PipesModule } from '../pipes/pipes.module';
import { HeroFilterComponent } from './hero-filter/hero-filter.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';

@NgModule({
  declarations: [
    HeroFilterComponent,
    HeroesListComponent
  ],
  imports: [
    BaseModule,
    CommonModule,
    PipesModule
  ],
  exports: [
    HeroesListComponent,
    HeroFilterComponent
  ]
})
export class SharedModule { }
