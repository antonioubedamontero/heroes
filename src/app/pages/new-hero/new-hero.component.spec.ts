import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHeroComponent } from './new-hero.component';

describe('NewHeroComponent', () => {
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
