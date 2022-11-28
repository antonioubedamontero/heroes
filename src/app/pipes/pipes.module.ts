import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroesPipe } from './heroes.pipe';

@NgModule({
  declarations: [
    HeroesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeroesPipe
  ]
})
export class PipesModule { }
