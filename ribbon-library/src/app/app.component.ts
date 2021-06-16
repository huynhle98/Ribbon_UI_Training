import { Component } from '@angular/core';
import { ApiHelperService } from 'ribbon-lib';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ribbon-library';
  data: any;

  constructor(private apiHelperService: ApiHelperService) {
    // this.data = this.apiHelperService.sendRequest('get', 'https://jsonplaceholder.typicode.com/posts', null,
    // console.log(this.data);
    this.apiHelperService.sendRequest('get', 'https://corona.lmao.ninja/v2/countries/vn', null, (res) => {
      this.data = JSON.stringify(res);
    });
  }
}
