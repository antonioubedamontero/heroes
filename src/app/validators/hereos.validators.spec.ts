import { TestBed } from '@angular/core/testing';
import { HeroesServiceListImpl } from '../services/heroes.service.list.impl';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HeroesValidators } from './heroes.validators';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BaseModule } from '../base/base.module';
import { of } from 'rxjs';

describe('- HeroesValidators (Custom validators)', () => {
    let heroesService: HeroesServiceListImpl;
    let heroesValidators: HeroesValidators;
    let fb: FormBuilder;
    let heroForm: FormGroup;

    beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [
            HttpClientTestingModule
          ],
          providers: [
            BaseModule,
            HeroesServiceListImpl,
            HeroesValidators,
            FormBuilder
          ]
        });
        fb = TestBed.inject(FormBuilder);
        heroesService = TestBed.inject(HeroesServiceListImpl);
        heroesValidators = TestBed.inject(HeroesValidators);
        heroForm = fb.group({
            name: ['héroe', [], HeroesValidators.userExistsValidator(heroesService)],
            gender: ['masculino', HeroesValidators.invalidGenderValidator],
            isHuman: [true, HeroesValidators.isHumanValidator],
            superPowers: fb.array([
                fb.control('luchar')
            ], HeroesValidators.containsSuperPowersValidator),
          });
        heroForm.get('name')?.markAsDirty();
    });

    it('✔️ HeroesValidators is created successfully', () => {
        expect(heroesValidators).toBeTruthy();
    })

    describe('- Custom name validations', () => {
        it('✔️ If user doesn\'t exist, validation pass', () => {
            spyOn(heroesService, 'verifyIfExistsByName')
                .and.returnValue(of({ exists: true }));
            heroForm.patchValue({
                name: 'Julián'
            });
            const hasExistError = heroForm.controls['name'].hasError('userAlreadyTaken');
            expect(hasExistError).toBeTrue();
        });

        it('✔️ If user already exists, userExistsValidation raises', () => {
            spyOn(heroesService, 'verifyIfExistsByName')
                .and.returnValue(of({ exists: false }));
            heroForm.patchValue({
                name: 'Julián'
            });
            const hasExistError = heroForm.controls['name'].hasError('userAlreadyTaken');
            expect(hasExistError).not.toBeTrue();
        });
    });

    describe('- gender custom validations', () => {
        it('✔️ If gender is one of the list, validation pass', () => {
            const hasGenderError = heroForm.controls['gender'].hasError('genderInvalid');
            expect(hasGenderError).toBeFalse();
        });

        it('✔️ If gender is not permitted, gender validation raises an error', () => {
            heroForm.patchValue({
                gender: 'poco XD'
            });
            const hasGenderError = heroForm.controls['gender'].hasError('genderInvalid');
            expect(hasGenderError).toBeTrue();
        });
    });

    describe('- isHuman custom validations', () => {
        it('✔️ If isHuman is true or false, validation pass', () => {
            const isHumanError = heroForm.controls['isHuman'].hasError('isHumanInvalid');
            expect(isHumanError).toBeFalse();
        });

        it('✔️ If isHuman is not true nor false, isHuman validation error raises', () => {
            heroForm.patchValue({
                isHuman: 'Sheldon Cooper'
            });
            const isHumanError = heroForm.controls['isHuman'].hasError('isHumanInvalid');
            expect(isHumanError).toBeTrue();
        });
    });

    describe('- superPowers customValidations', () => {
        it('✔️ if super powers list has, at least, one super-heroe, validation pass', () => {
            const superPowersIsEmptyError = heroForm.controls['superPowers'].hasError('superPowersArrayIsEmpty');
            expect(superPowersIsEmptyError).toBeFalse();
        });

        it('✔️ if super powers list is empty, super powers error validation is raised', () => {
            const superPowers = heroForm.get('superPowers') as FormArray;
            superPowers.clear();
            const superPowersIsEmptyError = heroForm.controls['superPowers'].hasError('superPowersArrayIsEmpty');
            expect(superPowersIsEmptyError).toBeTrue();
        });
    });
});
