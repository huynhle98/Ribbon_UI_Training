import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-lazy-loading',
  templateUrl: './lazy-loading.component.html',
  styleUrls: ['./lazy-loading.component.css']
})
export class LazyLoadingComponent implements OnInit, OnChanges {

  @Input() state: boolean;
  cls = '';

  constructor() {
    this.state = false;
   }

  ngOnInit(): void {
  }

  ngOnChanges(): void{
    if (this.state) {
      this.cls = ' active';
    }
    else {
      this.cls = '';
    }
  }

}
