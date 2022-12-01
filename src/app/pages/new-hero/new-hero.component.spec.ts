import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeroComponent } from './new-hero.component';
import { BaseModule } from '../../base/base.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('- NewHeroComponent (Page for add a new hero)', () => {
  let component: NewHeroComponent;
  let fixture: ComponentFixture<NewHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        NewHeroComponent 
      ],
      imports: [
        BaseModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('✔️ NewHeroComponent has been created', () => {
    expect(component).toBeTruthy();
  });
});
