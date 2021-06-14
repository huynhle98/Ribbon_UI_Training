import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-loading-over',
  templateUrl: './loading-over.component.html',
  styleUrls: ['./loading-over.component.css']
})
export class LoadingOverComponent implements OnInit {

  @Input() state: Boolean;
  cls = "";

  constructor() {
    this.state = false;
  }

  ngOnInit(): void {

  }
  ngOnChanges(): void {
    if (this.state) {
      this.cls = " active";
    }
    else {
      this.cls = "";
    }
  }

}
