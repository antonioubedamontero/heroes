import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { HeroesServiceListImpl } from '../../services/heroes.service.list.impl';
import { Hero } from '../../interfaces/hero';
import { Subscription } from 'rxjs';
import { PageList, Pagination } from '../../interfaces';
import { PageEvent } from '@angular/material/paginator';
import { PaginationResult } from '../../interfaces/pagination-result';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnChanges, OnDestroy {
  @Input() filterText = '';

  heroes: Hero[] = [];
  pagination: Pagination;
  paginationResult!: PaginationResult;
  displayedColumns: string[] = ['name', 'gender', 'isHuman', 'superPowers', 'team', 'options'];

  getHeroesSubscription!: Subscription;
  deleteHeroSubscription!: Subscription;

  constructor(private heroesService: HeroesServiceListImpl) { 
    this.pagination = {
      pageNumber: 0,
      itemsPerPage: 5
    };
    this.paginationResult = {
      page: 0,
      itemsPerPage: 5,
      numOfItems: 0
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const searchTerm = changes['searchTerm'].currentValue;
    // console.log('** on changes was triggered with', this.filterText);
    this.getHeroes();
  }

  ngOnDestroy(): void {
    this.getHeroesSubscription?.unsubscribe();
    this.deleteHeroSubscription?.unsubscribe();
  }

  private getHeroes(): void {
    const { pageNumber, itemsPerPage } = this.pagination; 
    this.getHeroesSubscription = this.heroesService.getHeroes({ pageNumber: pageNumber + 1, itemsPerPage }, this.filterText)
        .subscribe((pageList: PageList) => {
          this.heroes = pageList.heroes;
          this.paginationResult = pageList.paginationResult;
        });
  }

  editItem(hero: Hero): void {
    console.log('** edit hero', hero);
  }

  deleteItem(id: string): void {
    this.deleteHeroSubscription = this.heroesService.deleteHero(id)
      .subscribe((resp: any) => {
        this.pagination.pageNumber = 1;
        this.getHeroes();
      });
  }

  handlePaginationChanges(pageEvent: PageEvent): void {
    if (pageEvent.pageSize === this.pagination.itemsPerPage) {
      this.pagination.pageNumber = pageEvent.pageIndex;
    } else {
      this.pagination.pageNumber = 0;
      this.pagination.itemsPerPage = pageEvent.pageSize;
      this.paginationResult.numOfItems = 0;
    }
    this.getHeroes();
  }
}
