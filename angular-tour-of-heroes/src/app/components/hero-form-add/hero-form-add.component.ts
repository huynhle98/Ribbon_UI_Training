import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../model/hero';
import { HeroService } from '../../service/hero.service'
import { HeroType } from '../../model/heroType';

@Component({
  selector: 'app-hero-form-add',
  templateUrl: './hero-form-add.component.html',
  styleUrls: ['./hero-form-add.component.css']
})
export class HeroFormAddComponent implements OnInit {

  @Input() infoHero: Hero;
  @Output() newHero = new EventEmitter<Hero>();
  hero: Hero = {
    name: "",
    health: 0,
    healthRegen: 0,
    attackDamage: 0,
    attackRange: 0,
    powerMagic: 0,
    armor: 0,
    magicResist: 0,
    moveSpeed: 0,
    type: '',
    img: ''
  };

  types: HeroType[] = [
    { id: 0, type: 'Physical' },
    { id: 1, type: "Magic" }
  ];


  constructor(
    private heroService: HeroService
  ) {}

  ngOnInit() {
    var self = this;
    $('#formAddNewHero').on('hidden.bs.modal', function (e) {
      self.reset();
    })
  }

  add(hero: Hero): void {
    if (!hero.name.trim()) { this.reset(); return; }
    this.heroService.addHero(hero)
      .subscribe(hero => {
        this.newHero.emit(hero);
        this.reset();
      });
  }
  onChangeValType(event) {
    if (this.hero) {
      this.hero.type = event.currentTarget.value
    }
  }
  onNumber(event) {
    return event.charCode >= 48 && event.charCode <= 57 && event.charCode == 190
  }
  reset() {
    this.hero = {
      name: "",
      health: 0,
      healthRegen: 0,
      attackDamage: 0,
      attackRange: 0,
      powerMagic: 0,
      armor: 0,
      magicResist: 0,
      moveSpeed: 0,
      type: '',
      img: ''
    };
  }
}
