import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroComponent } from './edit-hero.component';

describe('- EditHeroComponent (Page for edit an hero by it\'s id)', () => {
  let component: EditHeroComponent;
  let fixture: ComponentFixture<EditHeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('✔️ EditHeroComponent has been created', () => {
    expect(component).toBeTruthy();
  });
});
