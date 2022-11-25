import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroeDetailComponent } from './heroe-detail.component';

describe('- HeroeDetailComponent (Page with hero details)', () => {
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

  it('✔️ HeroDetailsComponent has been created', () => {
    expect(component).toBeTruthy();
  });
});
