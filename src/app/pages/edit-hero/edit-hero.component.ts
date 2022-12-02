import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Hero } from '../../interfaces';
import { HeroesServiceListImpl } from 'src/app/services/heroes.service.list.impl';
import { HeroesValidators } from '../../validators/heroes.validators';

export const SNACK_BAR_DURATION_IN_SG = 2;

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit, OnDestroy {
  formHero: FormGroup;
  hero!: Hero;

  getHeroSubscription!: Subscription;
  updateHeroSubscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder,
    private snackBar: MatSnackBar, private router: Router, 
    private heroesService: HeroesServiceListImpl) {
      this.formHero = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)], HeroesValidators.userExistsValidator(this.heroesService)],
        gender: [null, HeroesValidators.invalidGenderValidator],
        isHuman: [null, HeroesValidators.isHumanValidator],
        superPowers: this.fb.array([], HeroesValidators.containsSuperPowersValidator),
        team: [null]
      });
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.getHero(id);
  }
  
  ngOnDestroy(): void {
    this.getHeroSubscription?.unsubscribe;
    this.updateHeroSubscription?.unsubscribe;
  }

  private getHero(id: string): void {
    this.getHeroSubscription = this.heroesService.getHero(id)
        .subscribe((hero: Hero) => {
          this.hero = hero
          this.loadHeroInForm(hero);
        });
  }

  private loadHeroInForm(hero: Hero): void {
    this.formHero.patchValue({
      name: hero.name,
      gender: hero.gender,
      isHuman: hero.isHuman,
      team: hero.team
    });
    hero.superPowers.forEach((superPower: string) => {
      this.addSuperPower(superPower)
    });
  }

  sendForm(): void {
    if (this.formHero.invalid) {
      this.formHero.markAllAsTouched();
      return;
    }
    const hero = this.formHero.value;
    this.updateHero(hero);
  }

  private updateHero(hero: Hero): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.updateHeroSubscription = this.heroesService.updateHero(id, hero)
        .subscribe((hero: Hero) => {
          this.snackBar.open('Se ha modificado el héroe correctamente', undefined, {
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

  addSuperPower(power = ''): void {
    this.superPowers.push(this.fb.control(power));
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
