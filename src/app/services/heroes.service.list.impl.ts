import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero, HeroModified, NewHero, PageList, Pagination } from '../interfaces';
import { HEROES_DATA_MOCK as mock } from '../mocks/heroes.data.mock';
import { HeroesService } from './heroes.service';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class HeroesServiceListImpl extends HeroesService{
  // heroes: Hero[] = [];
  heroes: Hero[] = this.loadFakeData();

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
    this.heroes = this.heroes.filter(hero => hero.id !== id);
    return of({});
  }

  override createHero = (newHeroParm: NewHero): Observable<Hero> => {
    const newHero = {
      id: Md5.hashStr(newHeroParm.name),  
      ...newHeroParm,
    };
    this.heroes.push(newHero);
    return of(newHero);
  }

  private loadFakeData(): Hero[] {
    const hero = mock.hero as unknown as Hero;
    return [
      { ...hero, name: 'hero 1', id: Md5.hashStr('hero 1') },
      { ...hero, name: 'hero 2', id: Md5.hashStr('hero 2') },
      { ...hero, name: 'hero 3', id: Md5.hashStr('hero 3') },
      { ...hero, name: 'hero 4', id: Md5.hashStr('hero 4') },
      { ...hero, name: 'hero 5', id: Md5.hashStr('hero 5') },
      { ...hero, name: 'hero 6', id: Md5.hashStr('hero 6') },
      { ...hero, name: 'hero 7', id: Md5.hashStr('hero 7') },
      { ...hero, name: 'hero 8', id: Md5.hashStr('hero 8') },
      { ...hero, name: 'hero 9', id: Md5.hashStr('hero 9') },
      { ...hero, name: 'hero 10', id: Md5.hashStr('hero 10') },
      { ...hero, name: 'hero 11', id: Md5.hashStr('hero 11') },
      { ...hero, name: 'hero 12', id: Md5.hashStr('hero 12') }
    ];
  }
}
