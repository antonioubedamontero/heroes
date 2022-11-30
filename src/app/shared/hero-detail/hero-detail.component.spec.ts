import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

import { BaseModule } from '../../base/base.module';
import { HeroDetailComponent, HeroField } from './hero-detail.component';
import { HeroesServiceListImpl } from '../../services/heroes.service.list.impl';
import { HEROES_DATA_MOCK as mock } from '../../mocks/heroes.data.mock';
import { Hero } from '../../interfaces';
import { MatDialogMock } from '../../mocks/mat-dialog-mock';
import { By } from '@angular/platform-browser';

const id = '1';

describe('- HeroDetailComponent (Modal with hero details)', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;
  let service: HeroesServiceListImpl;
  let getHeroSpy: any;
  let dialog: MatDialog;
  let dialogCloseSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeroDetailComponent
      ],
      imports: [
        BaseModule  
      ],
      providers: [
        HeroesServiceListImpl,
        {
          provide: MatDialogRef,
          useClass: MatDialogMock
        },
        { 
          provide: MAT_DIALOG_DATA, useValue: { id } 
        } 
     ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HeroesServiceListImpl);
    getHeroSpy = spyOn(service, 'getHero').and.returnValue(of(mock.hero as unknown as Hero))
    dialog = TestBed.inject(MatDialog);
    dialogCloseSpy = spyOn(component['dialogRef'], 'close');
    fixture.detectChanges();
  });

  it('✔️ Hero Details has been created', () => {
    expect(component).toBeTruthy();
  });

  it('✔️ Modal receives data from caller', () => {
    expect(component.data.id).toBeTruthy();
  });

  it('✔️ Call to rest API to recover the data of the hero by it\'s id', () => {
    expect(getHeroSpy).toHaveBeenCalledWith(id);
  });

  it('✔️ Data from service has been translated to processed data ', () => {
    expect(component.heroData.length).toBeGreaterThan(0);
    component.heroData.forEach((heroItem: HeroField) => {
      expect(heroItem.key).toBeTruthy();
      expect(heroItem.value).toBeTruthy();
    }); 
  });

  it('✔️ Has a close button', () => {
    const closeButton: HTMLElement = fixture.nativeElement.querySelector('#close');
    expect(closeButton).toBeTruthy();
  });

  it('✔️ When click in the close button, dialog is closed', () => {
    const closeButton: HTMLElement = fixture.nativeElement.querySelector('#close');
    closeButton.click();
    fixture.detectChanges();
    expect(dialogCloseSpy).toHaveBeenCalled();
  });
});
