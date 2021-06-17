import { Component, OnInit } from '@angular/core';
import { forkJoin, interval, Subject, of, throwError } from 'rxjs';
import { Hero } from '../../model/hero';
import { delay, take , map, catchError } from 'rxjs/operators';
import { ApiHelperService } from 'ribbon-lib';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  vn: any;
  us: any;
  jp: any;
  dataNormal = {
    vn: '',
    us: '',
    jp: ''
  };
  loading = true;

  forkJoin = forkJoin({
    switch1: this.apiHelperService.sendRequest('get', 'https://corona.lmao.ninja/v2/countries/vn', null, (res: any) => {
      this.vn = res;
    }),
    switch2: this.apiHelperService.sendRequest('get', 'https://corona.lmao.ninja/v2/countries/us', null, (res: any) => {
      this.us = res;
    }),
    switch3: this.apiHelperService.sendRequest('get', 'https://corona.lmao.ninja/v2/countries/jp', null, (res: any) => {
      this.jp = res;
    }),
  }).pipe(catchError(error => of(error)));

  constructor(
    private apiHelperService: ApiHelperService,
    private location: Location
  ) {
    this.initData();
  }

  ngOnInit(): void {
    this.forkJoin.subscribe(val => {
      console.log(val);
      this.loading = false;
    });
  }

  reload() {
    window.location.reload();
  }
  initData() {
    this.apiHelperService.sendRequest('get', 'https://corona.lmao.ninja/v2/countries/vn', null, (res: any) => {
      this.dataNormal.vn = res;
    });
    this.apiHelperService.sendRequest('get', 'https://corona.lmao.ninja/v2/countries/us', null, (res: any) => {
      this.dataNormal.us = res;
    });
    this.apiHelperService.sendRequest('get', 'https://corona.lmao.ninja/v2/countries/jp', null, (res: any) => {
      this.dataNormal.jp = res;
    });
  }
  changeSwitch() {
    interval(1000).pipe();
  }
  changeAll(event: any) {
    console.log(event);
  }

}
