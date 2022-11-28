import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFilterComponent } from './hero-filter.component';
import { BaseModule } from '../../base/base.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('- HeroFilterComponent (Input for filter heroes list)', () => {
  let component: HeroFilterComponent;
  let fixture: ComponentFixture<HeroFilterComponent>;
  let inputFilterHtml: HTMLElement;
  let buttonFilterHtml: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeroFilterComponent
      ],
      imports: [
        BaseModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroFilterComponent);
    component = fixture.componentInstance;
    inputFilterHtml = fixture.debugElement.nativeElement.querySelector('#input-filter');
    buttonFilterHtml = fixture.debugElement.nativeElement.querySelector('#filter-button');
    fixture.detectChanges();
  });

  it('✔️ HeroFilterComponent has been created', () => {
    expect(component).toBeTruthy();
  });

  describe('- Input to type filter text:', () => {
    it('✔️ Component has an input to enter a text to filter', () => {
      expect(inputFilterHtml).toBeTruthy()
    });

    it('✔️ Input presents a reset button only when there is a filter text', () => {
      let inputResetHtml: HTMLElement;

      component.filter = 'some text';
      fixture.detectChanges();
      inputResetHtml = fixture.debugElement.nativeElement.querySelector('#reset-button'); 
      expect(inputResetHtml).toBeTruthy();

      component.filter = '';
      fixture.detectChanges();
      inputResetHtml = fixture.debugElement.nativeElement.querySelector('#reset-button'); 
      expect(inputResetHtml).toBeFalsy();
    });

    it('✔️ If press reset button, filter text is reset', () => {
      component.filter = 'some text';
      fixture.detectChanges();
      const inputResetHtml = fixture.debugElement.nativeElement.querySelector('#reset-button');
      inputResetHtml.click();
      fixture.detectChanges();
      expect(component.filter).toBe('');
    });
  });

  describe('- Filter button:', () => {
    it('✔️ Component has a button to do filtering', () => {
      expect(buttonFilterHtml).toBeTruthy();
    });
    
    it('✔️ Filter button is only enabled when there is a filter text', () =>{
      component.filter = 'some text';
      fixture.detectChanges();
      expect(buttonFilterHtml.getAttribute('disabled')).toBeFalsy();

      component.filter = '';
      fixture.detectChanges();
      expect(buttonFilterHtml.getAttribute('disabled')).toBeTruthy();
    });

    it('✔️ If filter button is pressed, emits an event with filter written', () => {
      const filterEmittedMock = spyOn(component.filterEmitted, 'emit'); 
      component.filter = 'some text';
      fixture.detectChanges();
      buttonFilterHtml.click();
      fixture.detectChanges();
      expect(filterEmittedMock).toHaveBeenCalledWith(component.filter);
    });
  });
});
