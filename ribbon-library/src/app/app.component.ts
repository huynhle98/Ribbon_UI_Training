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
    // const url = 'https://corona.lmao.ninja/v2/countries/vn';
    const url = 'http://localhost:5001';
    this.apiHelperService.sendRequest('post', url, null, (res) => {
      this.data = res;
    });
  }
}
