import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

import { Hero } from '../../model/hero';
import { HeroService } from '../../service/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  @Output() heroesSearch = new EventEmitter<any>();
  @Output() stateSearch = new EventEmitter<any>();
  heroes$!: Observable<Hero[]>;
  stateCls: string;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService, private sanitizer: DomSanitizer) {
  }
  ngOnInit(): void {
    var self = this;
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(100),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term, function callback(val) {
        self.heroesSearch.emit(val);
      })),
    );
    // window.addEventListener('click', function (e) {
    //   if (document.querySelector('.search-component .search-result').contains(e.returnValue)) {
    //     console.log("a");
    //   } else {
    //     console.log("b");
    //   }
    // });
  }

  checkImg(url) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  search(term: string): void {
    this.searchTerms.next(term);
  }
  focusIn() {
    this.stateSearch.emit(true);
    this.stateCls = "";
  }
  focusOut(term: string) {
    setTimeout(() => {
      this.stateCls = "hidden";
    }, 500);
    if (term.length == 0) {
      this.stateSearch.emit(false);
    }
    else {
      this.stateSearch.emit(true);
    }
  }
}
