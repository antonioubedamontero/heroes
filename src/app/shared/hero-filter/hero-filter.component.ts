import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-filter',
  templateUrl: './hero-filter.component.html',
  styleUrls: ['./hero-filter.component.scss']
})
export class HeroFilterComponent {
  filter!: string;
  @Output() filterEmitted = new EventEmitter<string>();

  constructor(private router: Router) { 
    this.resetFilter();
  }

  resetFilter(): void {
    this.filter = '';
  }

  doFilter(): void {
    this.filterEmitted.emit(this.filter);
  }

  navigateToNewHeroPage(): void {
    this.router.navigateByUrl('/heroes/new');
  }
}
