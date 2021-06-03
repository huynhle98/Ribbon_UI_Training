import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../model/hero'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../service/hero.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero?: Hero;
  types= [
    { id: 1, val: "Physical"},
    { id: 2, val: "Magic"}
  ];
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getHero();

  }
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => { this.hero = hero});
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
  onChangeImg(event) {
    let f = event.currentTarget.files;
    if (f[0]) {
      this.hero.img = URL.createObjectURL(f[0]) as string;
    }
  }
  onChangeValType(event) {
    if (this.hero) {
      this.hero.type = event.currentTarget.value
    }
  }
  checkImg(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
