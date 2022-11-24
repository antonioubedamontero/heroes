import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

import { Observable } from 'rxjs';
import { Hero, HeroModified, NewHero, PageList, Pagination } from '../interfaces';

const baseUrl = env.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getHeroes = (pagination: Pagination, searchTerm?: string): Observable<PageList> => {
    if (searchTerm) {
      return this.http.post<PageList>(`${baseUrl}/heroes/query`, pagination, { params: { searchTerm } });
    } 
    return this.http.post<PageList>(`${baseUrl}/heroes/query`, pagination);
  }

  getHero = (id: string): Observable<Hero> => {
    return this.http.get<Hero>(`${baseUrl}/heroes/${id}`);
  }

  updateHero = (id: string, heroModified: HeroModified): Observable<Hero> => {
    return this.http.put<Hero>(`${baseUrl}/heroes/${id}`, heroModified);
  }

  deleteHero = (id: string): Observable<any> => {
    return this.http.delete(`${baseUrl}/heroes/${id}`);
  }

  createHero = (newHero: NewHero): Observable<Hero> => {
    return this.http.post<Hero>(`${baseUrl}/heroes`, newHero);
  }
}
