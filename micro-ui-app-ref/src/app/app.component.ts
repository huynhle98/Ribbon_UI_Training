import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { VERSION, HOST } from 'src/app/api/constant';
const { version: appVersion } = require('../../package.json');
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public isAuthenticated = false;
  public appVersion: string;
  title = 'vnfm';
  messages: any;
  ngOnInit() {

    console.log('Using HOST: ' + HOST);
    console.log('Using VERSION: ' + VERSION);

    const fePluginUrl = 'http://localhost:5001/main.js'; // hardcode for now
    const fePluginName = 'Fault Management'; // hardcode for now

    // Load external Micro Service FEs

    // Load the script
    const scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.src = fePluginUrl;
    scriptElement.onload = () => {
      console.log('External application loaded from: ' + fePluginUrl);

      // Web Component wrapper for FM
      // DO THE FOLLOWING IN WRAPPER COMPONENT e.g. fm.component
      /* const ngEl = document.createElement('rbn-fm');
      const ngElContainer = document.getElementById('ng-container');
      if (ngElContainer.children.length > 0) {
        ngElContainer.removeChild(ngElContainer.children[0]);
      }
      ngElContainer.appendChild(ngEl); */
    };
    scriptElement.onerror = (error: any) => {
      console.log('ERROR: Could not load external application from: ' + fePluginUrl);
    };
    // document.getElementsByTagName('body')[0].appendChild(scriptElement);

  }

  constructor(
    private translate: TranslateService,  private router: Router
  ) {
    this.appVersion = appVersion;
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.translate.get('MESSAGE_LOGIN').subscribe((res: string) => {
      this.messages = res;
    });

    // tslint:disable-next-line:only-arrow-functions
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
  };
  }



  logInUser() {
    this.isAuthenticated = true;
    this.router.navigateByUrl('/dashboard');
  }

}
