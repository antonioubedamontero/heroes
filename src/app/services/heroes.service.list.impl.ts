import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero, HeroModified, NewHero, PageList, Pagination } from '../interfaces';
import { HeroesService } from './heroes.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesServiceListImpl extends HeroesService{
  heroes: Hero[] = [];

  override getHeroes = (pagination: Pagination, searchTerm?: string): Observable<PageList> => {
    const filteredHeroes = !!searchTerm ? 
      this.heroes.filter((hero: Hero) => hero.name.toLowerCase().includes(searchTerm))
      : [...this.heroes];

    const startPos = (pagination.pageNumber - 1) * pagination.itemsPerPage;
    const endPos = startPos + pagination.itemsPerPage;

    return of(
      {
        heroes: filteredHeroes.slice(startPos, endPos),
        paginationResult: {
          page: pagination.pageNumber,
          itemsPerPage: pagination.itemsPerPage,
          numOfItems: filteredHeroes.length
        }
      });
  }

  override getHero = (id: string): Observable<Hero> => {
    const hero = this.heroes.find(hero => hero.id === id);
    if (!hero) throw new Error('Hero wasn\'t found!');
    return of(hero);
  }

  override updateHero = (id: string, heroModified: HeroModified): Observable<Hero> => {
    const index = this.heroes.findIndex((hero) => hero.id === id);
    if (index === -1 ) throw new Error('Hero wasn\'t found!');

    const oldValue: Hero = { ...this.heroes[index] };
    this.heroes[index] = { ...oldValue, ...heroModified};
    return of({ ...this.heroes[index] });
  }

  override deleteHero = (id: string): Observable<any> => {
    this.heroes = this.heroes.filter(hero => hero.id !== id)?.map((hero, index) => {
      hero.id = String(index + 1);
      return hero;
    });
    return of({});
  }

  override createHero = (newHeroParm: NewHero): Observable<Hero> => {
    const newHero = {
      id: String(this.heroes.length + 1),  
      ...newHeroParm,
    };
    this.heroes.push(newHero);
    return of(newHero);
  }
}
