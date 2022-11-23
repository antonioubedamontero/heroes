import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';
import { SharedModule } from '../shared/shared.module';
import { HeroesComponent } from './heroes/heroes.component';
import { NewHeroComponent } from './new-hero/new-hero.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { HeroeDetailComponent } from './heroe-detail/heroe-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    HeroesComponent,
    NewHeroComponent,
    EditHeroComponent,
    HeroeDetailComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    SharedModule
  ],
  exports: [
    HeroesComponent,
    NewHeroComponent,
    EditHeroComponent,
    HeroeDetailComponent,
    PageNotFoundComponent
  ]
})
export class PagesModule { }
