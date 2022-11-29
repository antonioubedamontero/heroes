import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { HeroesServiceListImpl } from '../../services/heroes.service.list.impl';
import { Hero } from '../../interfaces/hero';
import { Subscription } from 'rxjs';
import { PageList, Pagination } from '../../interfaces';
import { PageEvent } from '@angular/material/paginator';
import { PaginationResult } from '../../interfaces/pagination-result';
import { MatSnackBar } from '@angular/material/snack-bar';

const SNACK_BAR_DURATION_IN_SG = 2;
export const LG_COLUMNS = ['name', 'gender', 'isHuman', 'superPowers', 'team', 'options'];
export const MD_COLUMNS = ['name', 'gender', 'superPowers', 'team', 'options'];
export const SM_COLUMNS = ['name', 'superPowers', 'team', 'options'];
export const XS_COLUMNS = ['name', 'options'];

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnChanges, OnInit, OnDestroy {
  @Input() filterText = '';

  heroes: Hero[] = [];
  pagination!: Pagination;
  paginationResult!: PaginationResult;
  displayedColumns: string[] = ['name', 'gender', 'isHuman', 'superPowers', 'team', 'options'];

  getHeroesSubscription!: Subscription;
  deleteHeroSubscription!: Subscription;

  constructor(private heroesService: HeroesServiceListImpl,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.resizeTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // const searchTerm = changes['searchTerm'].currentValue;
    // console.log('** on changes was triggered with', this.filterText);
    this.initializePagination();
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
        this.showMessage('Héroe borrado correctamente');    
        this.initializePagination();
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

  showMessage(message: string): void{
    this.snackBar.open(message, undefined , {
      duration: SNACK_BAR_DURATION_IN_SG * 1000,
    });
  }

  private initializePagination(): void {
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

  resizeTable(): void {
    // const width = event.target.innerWidth;
    const width = this.getWindowInnerWidth();

    if (width >= 1280) {
      /* >= LG */
      this.displayedColumns = LG_COLUMNS
      return;
    }

    if (width >=960) {
      /* MD */
      this.displayedColumns = MD_COLUMNS;
      return;
    }

    if (width >= 600) {
      /* SM */
      this.displayedColumns = SM_COLUMNS;
      return;
    }
    this.displayedColumns = XS_COLUMNS;
  }

  getWindowInnerWidth(): number {
    return window.innerWidth;
  }
}
