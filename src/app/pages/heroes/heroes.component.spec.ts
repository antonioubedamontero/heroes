import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../../shared/shared.module';

import { HeroesComponent } from './heroes.component';

describe('- HeroesComponent (list of hero page)', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        HeroesComponent 
      ],
      imports: [
        BrowserAnimationsModule,
        SharedModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('✔️ HeroesComponent has been created', () => {
    expect(component).toBeTruthy();
  });

  it('✔️ Changes filter text when receiving a text from filter', () => {
    component.doFilter('my text');
    expect(component.filterText).toBe('my text');
  });
});
