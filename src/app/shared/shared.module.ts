import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';
import { PipesModule } from '../pipes/pipes.module';
import { HeroFilterComponent } from './hero-filter/hero-filter.component';
import { HeroesListComponent } from './heroes-list/heroes-list.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { DeleteHeroModalComponent } from './delete-hero-modal/delete-hero-modal.component';

@NgModule({
  declarations: [
    HeroFilterComponent,
    HeroesListComponent,
    HeroDetailComponent,
    DeleteHeroModalComponent
  ],
  imports: [
    BaseModule,
    CommonModule,
    PipesModule
  ],
  exports: [
    HeroFilterComponent,
    HeroesListComponent,
    HeroDetailComponent,
    DeleteHeroModalComponent
  ]
})
export class SharedModule { }
