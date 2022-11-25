import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BaseModule } from '../../base/base.module';

describe('- PageNotFoundComponent (Component rendered when page not found)', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let router: Router;
  let routerSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        PageNotFoundComponent 
      ],
      imports: [
        RouterTestingModule,
        BaseModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });

  it('✔️ PageNotFoundComponent has been created', () => {
    expect(component).toBeTruthy();
  });

  it('✔️ It must have a title', () => {
    const htmlTitleElement = fixture.nativeElement.querySelector('#title')
    expect(component.title).toBeTruthy();
    expect(htmlTitleElement.textContent).toBeTruthy();
  });

  it('✔️ It must have an explanation', () => {
    const htmlExplanation = fixture.nativeElement.querySelector('#explanation')
    expect(component.explanation).toBeTruthy();
    expect(htmlExplanation.textContent).toBeTruthy();
  });

  it('✔️ It must have a button that navigates to main page if clicked', () => {
    expect(component.goHome).toBeDefined();
    const button = fixture.nativeElement.querySelector('button');
    button.click()
    expect(button).toBeTruthy();
    expect(routerSpy).toHaveBeenCalledWith('/heroes');
  });
});
