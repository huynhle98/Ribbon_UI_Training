import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../model/hero';
import { HEROES } from '../data/mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    let heroes = HEROES;
    return { heroes };
  }

  getId(heroes: Hero[]): number{
    return heroes.length > 0 ? Math.max(...heroes.map(heroes => heroes.id)) + 1 : 11;
  }
  constructor() {

  }
}
