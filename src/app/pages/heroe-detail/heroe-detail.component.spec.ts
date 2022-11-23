import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeDetailComponent } from './heroe-detail.component';

describe('HeroeDetailComponent', () => {
  let component: HeroeDetailComponent;
  let fixture: ComponentFixture<HeroeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
