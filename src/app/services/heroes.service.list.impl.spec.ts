import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { HEROES_DATA_MOCK as mock } from '../mocks/heroes.data.mock';

import { HeroModified } from '../interfaces/hero-modified';
import { ExistsHeroReponse, Hero, NewHero, PageList, Pagination } from '../interfaces';
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
        { ...mock.hero as unknown as Hero, id: '1', name: 'héroe 1' },
        { ...mock.hero as unknown as Hero, id: '2', name: 'héroe 2' },
        { ...mock.hero as unknown as Hero, id: '3', name: 'héroe 3' },
        { ...mock.hero as unknown as Hero, id: '4', name: 'héroe 4' },
        { ...mock.hero as unknown as Hero, id: '5', name: 'héroe 5' },
        { ...mock.hero as unknown as Hero, id: '6', name: 'héroe 6' },
        { ...mock.hero as unknown as Hero, id: '7', name: 'hereo 7' },
        { ...mock.hero as unknown as Hero, id: '8', name: 'héroe 8' },
        { ...mock.hero as unknown as Hero, id: '9', name: 'héroe 9' },
        { ...mock.hero as unknown as Hero, id: '10', name: 'héro 10'},
        { ...mock.hero as unknown as Hero, id: '11', name: 'héroe 11'},
        { ...mock.hero as unknown as Hero, id: '12', name: 'héroe 12'}
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
      const searchTerm = 'roe 5';
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
            expect(hero.name).toBe('héroe 3');
            done();
        }
    )
  });

  it('✔️ updateHero update an hero by it\'s it and passed data', (done) => {
    const id = '2';
    const heroModified: HeroModified = {
        name: 'Black Widow',
        superPowers: ['atlética', 'experta usando armas'],
        team: 'Los Vengandores'
    }
    service.updateHero(id, heroModified).subscribe((hero: Hero) => {
        const expectedHero: Hero = {
            id: '2',
            name: 'Black Widow',
            gender: 'masculino',
            isHuman: true,
            superPowers: ['atlética', 'experta usando armas'],
            team: 'Los Vengandores'
        };
        expect(service.heroes).toContain(expectedHero);
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

  describe('- verifyIfExistsByName can verify..', () => {
    it('✔️ if an hero exists', () => {
      service.verifyIfExistsByName('héroe 3')
        .subscribe((resp: ExistsHeroReponse) => {
          expect(resp.exists).toBeTrue();
        });
    })
  });

  describe('- verifyIfExistsByName can verify..', () => {
    it('✔️ if an hero not exists', () => {
      service.verifyIfExistsByName('héroe 99')
        .subscribe((resp: ExistsHeroReponse) => {
          expect(resp.exists).toBeFalse();
        });
    })
  });
});
