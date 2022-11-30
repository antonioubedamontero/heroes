import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteHeroModalComponent } from './delete-hero-modal.component';
import { BaseModule } from '../../base/base.module';

describe('- DeleteHeroModalComponent (modal for confirmation delete an hero)', () => {
  let component: DeleteHeroModalComponent;
  let fixture: ComponentFixture<DeleteHeroModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        DeleteHeroModalComponent 
      ],
      imports: [
        BaseModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteHeroModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('✔️ DeleteHero component has beeen created', () => {
    expect(component).toBeTruthy();
  });
});
