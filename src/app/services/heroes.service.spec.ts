import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';
import { HEROES_DATA_MOCK as mock } from '../mocks/heroes.data.mock';

import { HeroesService } from './heroes.service';
import { HeroModified } from '../interfaces/hero-modified';
import { NewHero } from '../interfaces';

const baseUrl = env.baseUrl;

describe('- HeroesService (Service that consumes Heroes API Rest)', () => {
  let service: HeroesService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(HeroesService);
    http = TestBed.inject(HttpClient);
  });

  it('✔️ Service has been created', () => {
    expect(service).toBeTruthy();
  });

  describe('- getHeroes:', () => {
    let httpPostSpy: any;
    const pagination = mock.pagination;

    beforeEach(() => {
      httpPostSpy = spyOn(http, 'post');
    });
    
    it('✔️ getHeroes retrieves all heros without applying filter', () => {
      service.getHeroes(pagination);
      expect(httpPostSpy).toHaveBeenCalledWith(`${baseUrl}/heroes/query`, pagination);
    });

    it('✔️ getHeroes retrieves heroes with match with passed pattern', () => {
      const searchTerm = 'text';
      service.getHeroes(pagination, searchTerm);
      expect(httpPostSpy).toHaveBeenCalledWith(`${baseUrl}/heroes/query`, pagination,
        { params: { searchTerm } });
    });
  });

  it('✔️ getHero retrieves an hero by it\'s id', () => {
    const httpGetSpy = spyOn(http, 'get');
    const id = '123';

    service.getHero(id);

    expect(httpGetSpy).toHaveBeenCalledWith(`${baseUrl}/heroes/${id}`);
  });

  it('✔️ updateHero update an hero by it\'s it and passed data', () => {
    const httpPutSpy = spyOn(http, 'put');
    const id = '123';
    const heroModified = mock.heroModified as unknown as HeroModified;

    service.updateHero(id, heroModified);

    expect(httpPutSpy).toHaveBeenCalledWith(`${baseUrl}/heroes/${id}`, heroModified);
  });

  it('✔️ deleteHero delete an hero by it\'s id', () => {
    const httpDeleteSpy = spyOn(http, 'delete');
    const id = '123';
    
    service.deleteHero(id);

    expect(httpDeleteSpy).toHaveBeenCalledWith(`${baseUrl}/heroes/${id}`);
  });

  it('✔️ createHero create a new hero', () => {
    const httpPostSpy = spyOn(http, 'post');
    const newHero = mock.newHero as unknown as NewHero;
    
    service.createHero(newHero);

    expect(httpPostSpy).toHaveBeenCalledWith(`${baseUrl}/heroes`, newHero);
  });

  it('✔️ verifyIfExistsByName retrieve is an hero exists', () => {
    const httpGetSpy = spyOn(http, 'get');
    const hero = mock.newHero as unknown as NewHero;

    service.verifyIfExistsByName(hero.name);

    expect(httpGetSpy).toHaveBeenCalledWith(`${baseUrl}/heroes/name/${hero.name}/verify`);
  });
});
