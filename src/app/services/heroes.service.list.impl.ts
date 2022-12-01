import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ExistsHeroReponse, Hero, HeroModified, NewHero, PageList,
  Pagination } from '../interfaces';
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

  override verifyIfExistsByName = (heroName: string): Observable<ExistsHeroReponse> => {
    const findHero = this.heroes.find((hero: Hero) => hero.name === heroName);
    return findHero ? of({exists: true}) : of({exists: false});
  }

  private loadFakeData(): Hero[] {
    const hero = mock.hero as unknown as Hero;
    return [
      { ...hero, name: 'héroe 1', id: Md5.hashStr('héroe 1') },
      { ...hero, name: 'héroe 2', id: Md5.hashStr('héroe 2') },
      { ...hero, name: 'héroe 3', id: Md5.hashStr('héroe 3') },
      { ...hero, name: 'héroe 4', id: Md5.hashStr('héroe 4') },
      { ...hero, name: 'héroe 5', id: Md5.hashStr('héroe 5') },
      { ...hero, name: 'héroe 6', id: Md5.hashStr('héroe 6') },
      { ...hero, name: 'héroe 7', id: Md5.hashStr('héroe 7') },
      { ...hero, name: 'héroe 8', id: Md5.hashStr('héroe 8') },
      { ...hero, name: 'héroe 9', id: Md5.hashStr('héroe 9') },
      { ...hero, name: 'héroe 10', id: Md5.hashStr('héroe 10') },
      { ...hero, name: 'héroe 11', id: Md5.hashStr('héroe 11') },
      { ...hero, name: 'héroe 12', id: Md5.hashStr('héroe 12') }
    ];
  }
}
