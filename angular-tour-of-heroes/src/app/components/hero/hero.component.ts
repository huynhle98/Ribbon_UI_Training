import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../model/hero';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  @Input() heroInfo?: Hero;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  checkImg(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
