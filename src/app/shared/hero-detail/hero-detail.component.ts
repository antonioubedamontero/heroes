import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Hero } from '../../interfaces';
import { HeroesServiceListImpl } from '../../services/heroes.service.list.impl';

import { Subscription } from 'rxjs';

export interface HeroField {
  key: string;
  value: string;
}

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  heroData: HeroField[] = [];
  
  getHeroSubscription!: Subscription;

  constructor(private dialogRef: MatDialogRef<HeroDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string},
    private heroesService: HeroesServiceListImpl) 
  { }

  ngOnInit(): void {
    this.getHeroSubscription = this.heroesService.getHero(this.data.id)
        .subscribe((hero: Hero) => {
          this.heroData.push({ key: 'Id', value: hero.id });
          this.heroData.push({ key: 'Nombre', value: hero.name });
          this.heroData.push({ key: 'Género', value: this.getGenderTranslated(hero.gender)});
          this.heroData.push({ key: 'Humano', value: hero.isHuman ? 'Sí' : 'No' });
          this.heroData.push({ key: 'Súper Podéres', value: hero.superPowers.join(', ') });
          this.heroData.push({ key: 'Equipo', value: hero.team || ''});
        });
  }

  private getGenderTranslated(gender: string): string {
    switch (gender) {
      case 'male':
        return 'Hombre';
      case 'female':
        return 'Mujer';
      default:
        return gender;
    }
  }

  ngOnDestroy(): void {
    this.getHeroSubscription?.unsubscribe();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
