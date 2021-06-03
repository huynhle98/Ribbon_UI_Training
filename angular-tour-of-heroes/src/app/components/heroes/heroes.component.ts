import { Component, OnInit } from '@angular/core';
import { Hero } from '../../model/hero'
import { HEROES } from '../../data/mock-heroes'
import { HeroService } from '../../service/hero.service';
import { MessageService } from '../../service/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  heroesAll: Hero[] = [];
  heroesSearch: Hero[] = [];
  stateSearch: false;
  // selectedHero?: Hero;

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => (this.heroes = heroes, this.heroesAll = heroes));
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
  onHeroesSearch(val) {
    if (val != false) {
        this.heroes = val;
    }
    else {
      const typeVal = typeof val;
      if (typeVal == 'object') {
        this.heroes = val;
      }
      else {
        this.heroes = this.heroesAll;
      }
    }
  }
  onStateSearch(val) {
    this.stateSearch = val;
  }
  constructor(private heroService: HeroService, private messageService: MessageService) {

  }

  ngOnInit() {
    this.getHeroes();
  }

}
