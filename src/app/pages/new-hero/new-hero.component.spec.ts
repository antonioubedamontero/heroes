import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeroComponent } from './new-hero.component';

describe('- NewHeroComponent (Page for add a new hero)', () => {
  let component: NewHeroComponent;
  let fixture: ComponentFixture<NewHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHeroComponent ]
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
