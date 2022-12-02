import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeroesValidators } from '../../validators/heroes.validators';
import { FormArray } from '@angular/forms';
import { HeroesServiceListImpl } from 'src/app/services/heroes.service.list.impl';
import { Hero } from '../../interfaces/hero';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export const SNACK_BAR_DURATION_IN_SG = 2;

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss']
})
export class NewHeroComponent implements OnDestroy{
  formHero: FormGroup;

  createHeroSubscription!: Subscription;

  constructor(private fb: FormBuilder, private heroesService: HeroesServiceListImpl,
    private snackBar: MatSnackBar, private router: Router) { 
    this.formHero = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)], HeroesValidators.userExistsValidator(this.heroesService)],
      gender: [null, HeroesValidators.invalidGenderValidator],
      isHuman: [null, HeroesValidators.isHumanValidator],
      superPowers: this.fb.array([], HeroesValidators.containsSuperPowersValidator),
      team: [null]
    });
  }

  ngOnDestroy(): void {
    this.createHeroSubscription?.unsubscribe();
  }

  sendForm(): void {
    if (this.formHero.invalid) {
      this.formHero.markAllAsTouched();
      return;
    }
    const hero = this.formHero.value;
    this.createNewHero(hero);
  }

  private createNewHero(hero: Hero): void {
    this.createHeroSubscription = this.heroesService.createHero(hero)
      .subscribe((hero: Hero) => {
        this.snackBar.open('Se ha dado de alta el héroe correctamente', undefined, {
          duration: SNACK_BAR_DURATION_IN_SG * 1000,
        });
        this.router.navigateByUrl('/heroes');
      });
  }

  get genders(): string[] {
    return ['masculino', 'femenino', 'otro'];
  }

  hasErrors(fieldName: string): boolean {
    const field = this.formHero.get(fieldName); 
    return !!field?.errors && field.touched;
  }

  getErrorMessages(fieldName: string, translatedName: string): string[] {
    const messageErrors: string[] = [];
    const field = this.formHero.get(fieldName); 
    if (!field?.errors || field.untouched) {
      return messageErrors;
    }

    if (field.errors) {
      Object.keys(field.errors).forEach(errorType => {
        messageErrors.push(this.translateError(errorType, translatedName));
      });
    }
    return messageErrors;
  }

  get superPowers(): FormArray {
    return this.formHero.get('superPowers') as FormArray;
  }

  addSuperPower(): void {
    this.superPowers.push(this.fb.control(''));
  }

  deleteSuperPower(index: number): void {
    this.superPowers.removeAt(index);
  }

  translateError(errorType: string, translatedName: string): string {
    switch (errorType) {
      case 'minlength':
        return `El campo ${translatedName} es demasiado corto`;
      case 'required':
        return `El campo ${translatedName} es obligatorio`
      case 'genderInvalid':
        return 'El género debe ser "masculino", "femenino" u "otro"';
      case 'isHumanInvalid':
        return 'Debe indicar si es humano o no';
      case 'userAlreadyTaken':
        return 'El nombre de héroe ya está tomado';
      case 'superPowersArrayIsEmpty':
        return 'Debe informar, al menos, un súper poder'
      default:
        return 'Error no definido';
    }
  }
}
