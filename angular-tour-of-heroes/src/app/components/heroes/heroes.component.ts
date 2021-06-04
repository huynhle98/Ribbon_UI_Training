import { Component, OnInit } from '@angular/core';
import { Hero } from '../../model/hero'
import { HeroType } from '../../model/heroType'
import { HEROES } from '../../data/mock-heroes'
import { HeroService } from '../../service/hero.service';
import { MessageService } from '../../service/message.service';
import { trigger, style, animate, transition } from '@angular/animations';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(0)', opacity: 0 }),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('300ms', style({ transform: 'translateX(0)', opacity: 0 }))
      ])
    ]
    )
  ],
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
  heroesTemp: Hero[] = [];
  heroesAll: Hero[] = [];
  heroesSearch: Hero[] = [];
  stateSearch: false;
  heroTypes: HeroType[] = [
    {
      id: 0,
      type: 'All Type'
    },
    {
      id: 1,
      type: 'Physical'
    },
    {
      id: 2,
      type: 'Magic'
    }
  ];
  viewType = 0;
  // selectedHero?: Hero;

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }
  constructor(private heroService: HeroService, private messageService: MessageService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => (this.heroes = heroes, this.heroesAll = heroes, this.heroesTemp = heroes));
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
  onNewHero(val) {
    this.heroes.push(val);
  }
  onHeroesSearch(val) {
    const valType = document.getElementById("btnSortType").getAttribute("value");
    if (val != false) {
      this.heroes = val;
      this.heroesTemp = val;
      if (parseInt(valType) != 0) {
        this.heroes = this.heroes.filter(hero => hero.type == document.getElementById("btnSortType").textContent);
      }
    }
    else {
      const typeVal = typeof val;
      if (typeVal == 'object') {
        this.heroes = val;
      }
      else {
        this.heroes = this.heroesAll;
        if (parseInt(valType) != 0) {
          this.heroes = this.heroes.filter(hero => hero.type == document.getElementById("btnSortType").textContent);
        }
        this.heroesTemp = this.heroesAll
      }
    }
  }
  onStateSearch(val) {
    this.stateSearch = val;
  }
  sortToType(val: HeroType) {
    switch (val.id) {
      case 0:
        document.getElementById("btnSortType").textContent = val.type;
        document.getElementById("btnSortType").setAttribute("value", "" + val.id);
        this.heroes = this.heroesTemp;
        break;
      case 1:
        document.getElementById("btnSortType").textContent = val.type;
        document.getElementById("btnSortType").setAttribute("value", "" + val.id);
        this.heroes = this.heroesTemp.filter(hero => hero.type == val.type);
        break;
      case 2:
        document.getElementById("btnSortType").textContent = val.type;;
        document.getElementById("btnSortType").setAttribute("value", "" + val.id);
        this.heroes = this.heroesTemp.filter(hero => hero.type == val.type)
        break;
      default:
        break;

    }
  }
  changeView(val) {
    this.viewType = val;
  }
}
