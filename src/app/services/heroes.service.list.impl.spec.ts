import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { HEROES_DATA_MOCK as mock } from '../mocks/heroes.data.mock';

import { HeroModified } from '../interfaces/hero-modified';
import { Hero, NewHero, PageList, Pagination } from '../interfaces';
import { HeroesServiceListImpl } from './heroes.service.list.impl';

const baseUrl = env.baseUrl;

describe('- HeroesServiceListImpl (Service implementation with list that consumes Heroes API Rest)', () => {
  let service: HeroesServiceListImpl;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HeroesServiceListImpl);
    http = TestBed.inject(HttpClient);
    service.heroes = [
        { ...mock.hero as unknown as Hero, id: '1', name: 'hero 1' },
        { ...mock.hero as unknown as Hero, id: '2', name: 'hero 2' },
        { ...mock.hero as unknown as Hero, id: '3', name: 'hero 3' },
        { ...mock.hero as unknown as Hero, id: '4', name: 'hero 4' },
        { ...mock.hero as unknown as Hero, id: '5', name: 'hero 5' },
        { ...mock.hero as unknown as Hero, id: '6', name: 'hero 6' },
        { ...mock.hero as unknown as Hero, id: '7', name: 'hero 7' },
        { ...mock.hero as unknown as Hero, id: '8', name: 'hero 8' },
        { ...mock.hero as unknown as Hero, id: '9', name: 'hero 9' },
        { ...mock.hero as unknown as Hero, id: '10', name: 'hero 10'},
        { ...mock.hero as unknown as Hero, id: '11', name: 'hero 11'},
        { ...mock.hero as unknown as Hero, id: '12', name: 'hero 12'}
    ];
  });

  it('✔️ Service has been created', () => {
    expect(service).toBeTruthy();
  });

  describe('- getHeroes:', () => {   
    it('✔️ getHeroes retrieves all heros without applying filter', (done) => {
      const pagination: Pagination = {
        pageNumber: 3,
        itemsPerPage: 5
      };
      service.getHeroes(pagination).subscribe(
        (pageList: PageList) => {
            expect(pageList.heroes.length).toBe(2);
            done();
        }
      );
    });

    it('✔️ getHeroes retrieves heroes with match with passed pattern', (done) => {
      const searchTerm = 'ro 5';
      const pagination: Pagination = {
        pageNumber: 1,
        itemsPerPage: 5
      };
      service.getHeroes(pagination, searchTerm).subscribe(
        (pageList: PageList) => {
            expect(pageList.heroes.length).toBe(1);
            expect(pageList.heroes[0].id).toBe('5');
            done();
        }
      );
    });
  });

  it('✔️ getHero retrieves an hero by it\'s id', (done) => {
    const id = '3';
    service.getHero(id).subscribe(
        (hero: Hero) => {
            expect(hero).toBeDefined();
            expect(hero.id).toBe('3');
            expect(hero.name).toBe('hero 3');
            done();
        }
    )
  });

  it('✔️ updateHero update an hero by it\'s it and passed data', (done) => {
    const id = '2';
    const heroModified: HeroModified = {
        name: 'Black Widow',
        superPowers: ['athletic', 'expert using weapons'],
        team: 'Avengers'
    }
    service.updateHero(id, heroModified).subscribe((hero: Hero) => {
        const newHero: Hero = {
            id: '2',
            name: 'Black Widow',
            gender: 'male',
            isHuman: true,
            superPowers: ['athletic', 'expert using weapons'],
            team: 'Avengers'
        };
        expect(service.heroes).toContain(newHero);
        done();
    });
  });

  it('✔️ deleteHero delete an hero by it\'s id', (done) => {
    const id = '8';    
    service.deleteHero(id).subscribe(() => {
        expect(service.heroes.length).toBe(11);
        done();
    });
  });

  it('✔️ createHero create a new hero', (done) => {
    const newHero: NewHero = mock.newHero as unknown as NewHero;
    service.createHero(newHero).subscribe(() => {
            expect(service.heroes.length).toBe(13);
            done();
    });
  });
});
