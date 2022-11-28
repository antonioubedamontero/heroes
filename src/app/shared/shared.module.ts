import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { BaseModule } from '../base/base.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    HeroesListComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    PipesModule
  ],
  exports: [
    HeroesListComponent
  ]
})
export class SharedModule { }
