import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseModule } from '../base/base.module';
import { SharedModule } from '../shared/shared.module';
import { HeroesComponent } from './heroes/heroes.component';
import { NewHeroComponent } from './new-hero/new-hero.component';
import { EditHeroComponent } from './edit-hero/edit-hero.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DirectivesModule } from '../directives/directives.module';

@NgModule({
  declarations: [
    HeroesComponent,
    NewHeroComponent,
    EditHeroComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    SharedModule,
    DirectivesModule
  ],
  exports: [
    HeroesComponent,
    NewHeroComponent,
    EditHeroComponent,
    PageNotFoundComponent
  ]
})
export class PagesModule { }
