import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';


@Component({
  selector: 'app-topheader',
  templateUrl: './topheader.component.html',
  styleUrls: ['./topheader.component.scss']
})
export class TopheaderComponent implements OnInit, OnDestroy {

  private _destroySubject = new Subject<void>();
  vnfmState = '';
  vnfmStateTxt = '';

  constructor() {}

  productName = 'EMS';
  ngOnInit() {

  }



  ngOnDestroy() {
    this._destroySubject.next();
  }
}
