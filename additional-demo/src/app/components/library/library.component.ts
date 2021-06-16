/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { ApiHelperService } from 'ribbon-lib';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  data: any;
  updated: any;
  loading = true;

  constructor(private apiHelperService: ApiHelperService) {
    this.apiHelperService.sendRequest('get', 'https://corona.lmao.ninja/v2/countries/vn', null, (res: any) => {
      this.data = res;
      this.updated = new Date(this.data.updated).toLocaleString();
      this.loading = false;
    });
   }

  ngOnInit(): void {

  }

}
