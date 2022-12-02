import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeroesListComponent, LG_COLUMNS, MD_COLUMNS, SM_COLUMNS, XS_COLUMNS } from './heroes-list.component';
import { BaseModule } from '../../base/base.module';
import { HeroesServiceListImpl } from '../../services/heroes.service.list.impl';
import { PipesModule } from '../../pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HEROES_DATA_MOCK as mock } from '../../mocks/heroes.data.mock';
import { Hero, PageList } from '../../interfaces';
import { SimpleChange } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogMock, setMatDialogCloseValue } from '../../mocks/mat-dialog-mock';
import { Router } from '@angular/router';

describe('- HeroesListComponent (Show heroes list)', () => {
  describe(' - General Tests: ', () => {
      let component: HeroesListComponent;
      let fixture: ComponentFixture<HeroesListComponent>;
      let service: HeroesServiceListImpl;
      let getHeroesSpy: any;
      let deleteHeroSpy: any;
      let getWindowInnerWidthSpy: any;
      let dialog: MatDialog;
      let router: Router;
      let routerNavigateSpy: any;

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
            HeroesServiceListImpl,
            { provide: MatDialog, useClass: MatDialogMock }
          ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(HeroesListComponent);
        component = fixture.componentInstance;
        service = TestBed.inject(HeroesServiceListImpl);
        getHeroesSpy = spyOn(service, 'getHeroes').and.returnValue(of(mock.pageList as unknown as PageList));
        deleteHeroSpy = spyOn(service, 'deleteHero').and.callThrough();
        getWindowInnerWidthSpy = spyOn(component, 'getWindowInnerWidth');
        router = TestBed.inject(Router);
        routerNavigateSpy = spyOn(router, 'navigate');
        dialog = TestBed.inject(MatDialog);
        setMatDialogCloseValue(true);

        // ngOnChanges must be triggered manually, because it relies on view changes
        component.ngOnChanges({
          filterText: new SimpleChange(null, '', true)
        });
        getWindowInnerWidthSpy.and.returnValue(1920);
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

      describe('- If press in delete an hero:', () => {
        it('✔️ ... and says yes to confirm, delete endpoint is called, reaload heroesList and send a message', () => {
          const showMessageSpy = spyOn(component, 'showMessage').and.callThrough();
          const id = '1';
          component.deleteHero(id);
          expect(deleteHeroSpy).toHaveBeenCalledWith(id);
          expect(getHeroesSpy).toHaveBeenCalledTimes(2);
          expect(showMessageSpy).toHaveBeenCalledWith('Héroe borrado correctamente');
        });

        xit('✔️ ... and says no to confirm, delete endpoint is not called, and not reaload heroesList nor send a message', () => {
          setMatDialogCloseValue(false);
          const showMessageSpy = spyOn(component, 'showMessage').and.callThrough();
          const id = '1';
          component.deleteHero(id);
          expect(deleteHeroSpy).not.toHaveBeenCalled();
          expect(getHeroesSpy).toHaveBeenCalledTimes(1);
          expect(showMessageSpy).not.toHaveBeenCalled();
        });
      })

      it('✔️ When press modify an hero, it navigates to hero modify page', () => {
        const id = '1';
        component.editHero(id);
        expect(routerNavigateSpy).toHaveBeenCalledWith(['/heroes', id, 'edit']);      
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

  describe('- Table fields are shown according device width for: ', () => {
    let component: HeroesListComponent;
    let fixture: ComponentFixture<HeroesListComponent>;
    let getWindowInnerWidthSpy: any;
    let router: Router;
    let routerNavigateSpy: any;

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
          HeroesServiceListImpl,
          { provide: MatDialog, useClass: MatDialogMock }
        ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(HeroesListComponent);
      component = fixture.componentInstance;
      getWindowInnerWidthSpy = spyOn(component, 'getWindowInnerWidth');
      router = TestBed.inject(Router);
      routerNavigateSpy = spyOn(router, 'navigate');

      // ngOnChanges must be triggered manually, because it relies on view changes
      component.ngOnChanges({
        filterText: new SimpleChange(null, '', true)
      });
      fixture.detectChanges();
    });

    it('✔️ For xl devices', () => {
      getWindowInnerWidthSpy.and.returnValue(1920);
      component.resizeTable();
      expect(component.displayedColumns).toEqual(LG_COLUMNS);
    });

    it('✔️ For lg devices', () => {
      getWindowInnerWidthSpy.and.returnValue(1280);
      component.resizeTable();
      expect(component.displayedColumns).toEqual(LG_COLUMNS);
    });

    it('✔️ For md devices', () => {
      getWindowInnerWidthSpy.and.returnValue(960);
      component.resizeTable();
      expect(component.displayedColumns).toEqual(MD_COLUMNS);
    });

    it('✔️ For sm devices', () => {
      getWindowInnerWidthSpy.and.returnValue(600);
      component.resizeTable();
      expect(component.displayedColumns).toEqual(SM_COLUMNS);
    });

    it('✔️ For xs devices', () => {
      getWindowInnerWidthSpy.and.returnValue(400);
      component.resizeTable();
      expect(component.displayedColumns).toEqual(XS_COLUMNS);
    });
  });
});
