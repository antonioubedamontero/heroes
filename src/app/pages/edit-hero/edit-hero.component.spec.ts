import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, FormArray } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

import { EditHeroComponent, SNACK_BAR_DURATION_IN_SG } from './edit-hero.component';
import { BaseModule } from '../../base/base.module';
import { HeroesServiceListImpl } from 'src/app/services/heroes.service.list.impl';
import { HEROES_DATA_MOCK as mock } from '../../mocks/heroes.data.mock';
import { Hero } from '../../interfaces/hero';
import { HeroesValidators } from '../../validators/heroes.validators';

const MODIFIED_HERO: Hero = {
  id: '1',
    name: 'Nombre modificado',
    gender: 'femenino',
    isHuman: true,
    superPowers: [
        'Súper poder modificado'
    ],
    team: 'Equipo'
};

describe('- EditHeroComponent (Page for modify an hero)', () => {
  let component: EditHeroComponent;
  let fixture: ComponentFixture<EditHeroComponent>;
  let heroesService: HeroesServiceListImpl;
  let getHeroSpy: any;
  let updateHeroSpy: any;
  let fb: FormBuilder;
  let snackBar: MatSnackBar;
  let matSnackBarOpenSpy: any;
  let router: Router;
  let routerSpy: any;
  let verifyIfExistsByNameSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        EditHeroComponent 
      ],
      imports: [
        BaseModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: '1'}}
          }
        },
        FormBuilder,
        HeroesServiceListImpl,
        MatSnackBar,
        HeroesValidators
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHeroComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesServiceListImpl);
    getHeroSpy = spyOn(heroesService, 'getHero')
      .and.returnValue(of(mock.hero as unknown as Hero));
    updateHeroSpy = spyOn(heroesService, 'updateHero')
      .and.returnValue(of(MODIFIED_HERO));
    verifyIfExistsByNameSpy = spyOn(heroesService, 'verifyIfExistsByName')
      .and.returnValue(of({ exists: false }));
    fb = TestBed.inject(FormBuilder);
    snackBar = TestBed.inject(MatSnackBar);
    matSnackBarOpenSpy = spyOn(snackBar, 'open');
    router =  TestBed.inject(Router);
    routerSpy = spyOn(router, 'navigateByUrl');
    fixture.detectChanges();
  });

  it('✔️ EditHeroComponent has been created', () => {
    expect(component).toBeTruthy();
  });

  describe('- If the form data with hero modified is correct...', () => {
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

    it('✔️ Call service to update hero', () => {
      const hero = component.formHero.value;
      const id = '1';
      expect(updateHeroSpy).toHaveBeenCalledWith(id, hero);
    });

    it('✔️ Show a message indicating that hero has been updated', () => {
      expect(matSnackBarOpenSpy).toHaveBeenCalledWith('Se ha modificado el héroe correctamente', undefined, {
        duration: SNACK_BAR_DURATION_IN_SG * 1000,
      });
    });

    it('✔️ Redirects to list of heroes pages', () => {
      expect(routerSpy).toHaveBeenCalledWith('/heroes');
    });
  });

  describe('- If the form data with hero modified is not correct...', () => {
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

    xit('✔️ Form is incorrect and have validation errors', () => {
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
  
    xit('✔️ Is not calling service to update hero', () => {
      expect(updateHeroSpy).not.toHaveBeenCalled();
    });
  
    xit('✔️ Don\'t show a message indicating that hero has been updated', () => {
      expect(matSnackBarOpenSpy).not.toHaveBeenCalledWith('Se ha modificado el héroe correctamente', undefined, {
        duration: SNACK_BAR_DURATION_IN_SG * 1000,
      });
    });
  
    xit('✔️ Don\'t redirects to list of heroes pages', () => {
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
