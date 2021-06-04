import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../model/hero';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-hero-type-list',
  templateUrl: './hero-type-list.component.html',
  styleUrls: ['./hero-type-list.component.css']
})
export class HeroTypeListComponent implements OnInit {

  @Input() heroInfo?: Hero

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  checkImg(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
