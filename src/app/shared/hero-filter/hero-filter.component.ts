import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-hero-filter',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss']
})
export class HeroFilterComponent {
  filter!: string;
  @Output() filterEmitted = new EventEmitter<string>();

  constructor() { 
    this.resetFilter();
  }

  resetFilter(): void {
    this.filter = '';
  }

  doFilter(): void {
    this.filterEmitted.emit(this.filter);
  }
}
