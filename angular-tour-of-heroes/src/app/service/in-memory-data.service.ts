import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from '../model/hero';
import { HEROES } from '../data/mock-heroes';
import { SKINS } from '../data/mock-skins';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  createDb() {
    let heroes = HEROES;
    let skins = SKINS;
    return { heroes, skins }
  }

  getId(heroes: Hero[]): number{
    return heroes.length > 0 ? Math.max(...heroes.map(heroes => heroes.id)) + 1 : 11;
  }
  constructor() {

  }
}
