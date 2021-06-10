import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hero } from '../../model/hero';
import { HeroService } from '../../service/hero.service'
import { HeroType } from '../../model/heroType';
import * as $ from 'jquery';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
    type: "Physical",
    img: '/assets/img/default/default-image.jpg'
  };
  addHeroForm = this.fb.group({
    name: ['', Validators.required],
    health: [0],
    healthRegen: [0],
    attackDamage: [0],
    attackRange: [0],
    powerMagic: [0],
    armor: [0],
    magicResist: [0],
    moveSpeed: [0],
    type: [""],
    img: [""]
  });
  types: HeroType[] = [
    { id: 0, type: 'Physical' },
    { id: 1, type: "Magic" }
  ];

  constructor(
    private heroService: HeroService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    var self = this;
    // $('#formAddNewHero').on('hidden.bs.modal', function (e) {
    //   self.reset();
    // })
  }
  ngAfterViewInit() {
    // this.hero.type = "Physical";
  }

  checkImg(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  onChangeImg(event) {
    let f = event.currentTarget.files;
    if (f[0]) {
      this.hero.img = URL.createObjectURL(f[0]) as string;
    }
  }
  onSubmitAdd() {
    this.heroService.addHero(this.hero)
      .subscribe(hero => {
        this.newHero.emit(hero);
        this.reset();
        $(".btn-close").trigger("click");
        // $(".btn-close").on("click",function(){},)
      });
  }
  close() {
    this.reset();
    // $('#formAddNewHero').modal('hide')
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
    return (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105) && event.keyCode == 190 || event.keyCode == 46
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
      img: '/assets/img/default/default-image.jpg'
    };
  }
}
