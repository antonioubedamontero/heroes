import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './pages/heroes/heroes.component';
import { EditHeroComponent } from './pages/edit-hero/edit-hero.component';
import { NewHeroComponent } from './pages/new-hero/new-hero.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

// NOTE: Not implementing lazy load because there is only one collection
const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'heroes/new', component: NewHeroComponent },
  { path: 'heroes/:id/edit', component: EditHeroComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
