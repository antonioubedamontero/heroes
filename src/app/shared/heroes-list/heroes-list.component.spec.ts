import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroesListComponent } from './heroes-list.component';
import { BaseModule } from '../../base/base.module';
import { HeroesServiceListImpl } from '../../services/heroes.service.list.impl';
import { PipesModule } from '../../pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HEROES_DATA_MOCK as mock } from '../../mocks/heroes.data.mock';
import { Hero, PageList } from '../../interfaces';
import { SimpleChange } from '@angular/core';

describe('- HeroesListComponent (Show heroes list)', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let service: HeroesServiceListImpl;
  let getHeroesSpy: any;
  let deleteHeroSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        HeroesListComponent
      ],
      imports: [
        BaseModule,
        PipesModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        HeroesServiceListImpl
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HeroesServiceListImpl);
    getHeroesSpy = spyOn(service, 'getHeroes').and.returnValue(of(mock.pageList as unknown as PageList));
    deleteHeroSpy = spyOn(service, 'deleteHero').and.callThrough();

    // ngOnChanges must be triggered manually, because it relies on view changes
    component.ngOnChanges({
      filterText: new SimpleChange(null, '', true)
    });
    fixture.detectChanges();
  });

  it('✔️ HeroesListComponent has been created', () => {
    expect(component).toBeTruthy();
  });

  it('✔️ Should have a table and a paginator', () => {
    const table = fixture.nativeElement.querySelector('mat-table');
    const paginator = fixture.nativeElement.querySelector('mat-paginator');
    expect(table).toBeTruthy();
    expect(paginator).toBeTruthy();
  });

  it('✔️ Should retrieve the first page of table', () => {
    expect(getHeroesSpy).toHaveBeenCalledWith({ pageNumber: 1, itemsPerPage: 5 }, '');
    expect(component.heroes.length).toBeGreaterThan(0);
  });

  it('✔️ Table must return required fields', () => {
    component.heroes.forEach((hero: Hero) => {
      expect(hero.gender).toBeTruthy();
      expect(hero.id).toBeTruthy();
      expect(hero.isHuman).toBeInstanceOf(Boolean);
      expect(hero.name).toBeTruthy();
      expect(hero.superPowers.length).toBeGreaterThan(0);
      expect(hero.team).toBeTruthy();
    });
  });

  it('✔️ When press next, we recover next page, when press previous, previous page', () => {
    let pageEvent = {
      pageIndex: 1,
      previousPageIndex: 0,
      pageSize: 5,
      length: 2
    };
    component.handlePaginationChanges(pageEvent);

    expect(getHeroesSpy).toHaveBeenCalledWith({ pageNumber: 2, itemsPerPage: 5 }, '');
    
    pageEvent.pageIndex = 0
    pageEvent.previousPageIndex = 1;

    component.handlePaginationChanges(pageEvent);

    expect(getHeroesSpy).toHaveBeenCalledWith({ pageNumber: 1, itemsPerPage: 5 }, '');
  });

  it('✔️ If delete an item, it calls to delete endpoint and reaload page', () => {
    const id = '1';
    component.deleteItem(id);
    expect(deleteHeroSpy).toHaveBeenCalledWith(id);
    expect(getHeroesSpy).toHaveBeenCalledTimes(2);
  });

  xit('✔️ If receives a search term, service is called with that search term', (done) => {
    component.ngOnChanges({
      filterText: new SimpleChange('', 'mag', false)
    });
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(getHeroesSpy).toHaveBeenCalledWith({ pageNumber: 1, itemsPerPage: 5 }, 'mag');
      done();
    });
  });
});
