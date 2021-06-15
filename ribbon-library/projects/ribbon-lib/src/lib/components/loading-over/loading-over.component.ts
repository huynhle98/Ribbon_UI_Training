import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'lib-loading-over',
  templateUrl: './loading-over.component.html',
  styleUrls: ['./loading-over.component.css']
})
export class LoadingOverComponent implements OnInit, OnChanges {

  @Input() state: boolean;
  cls = '';

  constructor() {
    this.state = false;
  }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    if (this.state) {
      this.cls = ' active';
    }
    else {
      this.cls = '';
    }
  }

}
