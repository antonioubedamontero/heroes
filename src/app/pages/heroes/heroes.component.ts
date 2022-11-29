import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  filterText: string = '';

  constructor() { }

  doFilter(searchTerm: string): void {
    this.filterText = searchTerm;
  }
}
