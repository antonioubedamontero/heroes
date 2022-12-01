import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormArray } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NewHeroComponent, SNACK_BAR_DURATION_IN_SG } from './new-hero.component';
import { BaseModule } from '../../base/base.module';
import { HeroesServiceListImpl } from 'src/app/services/heroes.service.list.impl';
import { HEROES_DATA_MOCK as mock } from '../../mocks/heroes.data.mock';
import { Hero } from '../../interfaces/hero';
import { HeroesValidators } from '../../validators/heroes.validators';

describe('- NewHeroComponent (Page for add a new hero)', () => {
  let component: NewHeroComponent;
  let fixture: ComponentFixture<NewHeroComponent>;
  let heroesService: HeroesServiceListImpl;
  let createHeroSpy: any;
  let fb: FormBuilder;
  let snackBar: MatSnackBar;
  let matSnackBarOpenSpy: any;
  let router: Router;
  let routerSpy: any;
  let verifyIfExistsByNameSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        NewHeroComponent 
      ],
      imports: [
        BaseModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        HeroesServiceListImpl,
        MatSnackBar,
        HeroesValidators
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHeroComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesServiceListImpl);
    createHeroSpy = spyOn(heroesService, 'createHero')
      .and.returnValue(of(mock.hero as unknown as Hero));
    verifyIfExistsByNameSpy = spyOn(heroesService, 'verifyIfExistsByName')
      .and.returnValue(of({ exists: false }));
    fb = TestBed.inject(FormBuilder);
    snackBar = TestBed.inject(MatSnackBar);
    matSnackBarOpenSpy = spyOn(snackBar, 'open');
    router =  TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });

  it('✔️ NewHeroComponent has been created', () => {
    expect(component).toBeTruthy();
  });

  describe('- If the form data with new hero is correct...', () => {
    beforeEach((done) => {
      component.formHero.patchValue({
        name: 'Capitán Sevilla',
        gender: 'masculino',
        isHuman: true,
        superPowers: [],
        team: 'Grandes de España'
      });
      const superPowers = component.formHero.get('superPowers') as FormArray;
      superPowers.push(fb.control('El mejor súper héroe español'));
      component.formHero.updateValueAndValidity();
      fixture.detectChanges();
      fixture.whenStable().then(
        (resp) => {
          component.sendForm();
          done();
        }
      )
    });

    it('✔️ Form is correct and not have validation errors', () => {
      expect(component.formHero.valid).toBeTrue();
    
      expect(component.hasErrors('name')).toBeFalse();
      expect(component.getErrorMessages('name', 'Nombre').length).toBe(0);

      expect(component.hasErrors('gender')).toBeFalse();
      expect(component.getErrorMessages('gender', 'Género').length).toBe(0);

      expect(component.hasErrors('isHuman')).toBeFalse();
      expect(component.getErrorMessages('isHuman', 'Humano').length).toBe(0);

      expect(component.hasErrors('superPowers')).toBeFalse();
      expect(component.getErrorMessages('superPowers', 'Súper Podéres').length).toBe(0);
    });

    it('✔️ Call service to create a new hero', () => {
      const newHero = component.formHero.value;
      expect(createHeroSpy).toHaveBeenCalledWith(newHero);
    });

    it('✔️ Show a message indicating that hero has been created', () => {
      expect(matSnackBarOpenSpy).toHaveBeenCalledWith('Se ha dado de alta el héroe correctamente', undefined, {
        duration: SNACK_BAR_DURATION_IN_SG * 1000,
      });
    });

    it('✔️ Redirects to list of heroes pages', () => {
      expect(routerSpy).toHaveBeenCalledWith('/heroes');
    });
  });

  describe('- If the form data with new hero is not correct...', () => {
    beforeEach((done) => {
      component.formHero.patchValue({
        name: 'Capitán Sevilla',
        gender: 'masculino',
        isHuman: true,
        superPowers: [],
        team: 'Grandes de España'
      });
      component.formHero.updateValueAndValidity();
      fixture.detectChanges();
      fixture.whenStable().then(
        (resp) => {
          component.sendForm();
          done();
        }
      )
    });

    it('✔️ Form is incorrect and have validation errors', () => {
      expect(component.formHero.invalid).toBeTrue();
    
      expect(component.hasErrors('name')).toBeFalse();
      expect(component.getErrorMessages('name', 'Nombre').length).toBe(0);
  
      expect(component.hasErrors('gender')).toBeFalse();
      expect(component.getErrorMessages('gender', 'Género').length).toBe(0);
  
      expect(component.hasErrors('isHuman')).toBeFalse();
      expect(component.getErrorMessages('isHuman', 'Humano').length).toBe(0);
  
      expect(component.hasErrors('superPowers')).toBeTrue();
      expect(component.getErrorMessages('superPowers', 'Súper Podéres').length).toBeGreaterThan(0)
    });
  
    it('✔️ Is not calling service to create a new hero', () => {
      expect(createHeroSpy).not.toHaveBeenCalled();
    });
  
    it('✔️ Don\'t show a message indicating that hero has been created', () => {
      expect(matSnackBarOpenSpy).not.toHaveBeenCalledWith('Se ha dado de alta el héroe correctamente', undefined, {
        duration: SNACK_BAR_DURATION_IN_SG * 1000,
      });
    });
  
    it('✔️ Don\'t redirects to list of heroes pages', () => {
      expect(routerSpy).not.toHaveBeenCalledWith('/heroes');
    });

    it('✔️ Required Errors are registered and translated', () => {
      expect(component.translateError('minlength', 'nombre'))
        .toBe('El campo nombre es demasiado corto');
      expect(component.translateError('required', 'nombre'))
        .toBe('El campo nombre es obligatorio');
      expect(component.translateError('genderInvalid', 'genero'))
        .toBe('El género debe ser "masculino", "femenino" u "otro"');
      expect(component.translateError('isHumanInvalid', 'humano'))
        .toBe('Debe indicar si es humano o no');
      expect(component.translateError('userAlreadyTaken', 'usuario'))
        .toBe('El nombre de héroe ya está tomado');
      expect(component.translateError('superPowersArrayIsEmpty', 'super podéres'))
        .toBe('Debe informar, al menos, un súper poder');
      expect(component.translateError('unexpected', 'campo'))
        .toBe('Error no definido');
    });
  });
});
