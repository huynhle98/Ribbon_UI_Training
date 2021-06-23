import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fm',
  templateUrl: './fm.component.html',
  styleUrls: ['./fm.component.scss']
})
export class FmComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('Loading and creating FM Micro UI');

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
      const ngEl = document.createElement('rbn-fm');
      const ngElContainer = document.getElementById('ng-container');
      if (ngElContainer.children.length > 0) {
        ngElContainer.removeChild(ngElContainer.children[0]);
      }
      ngElContainer.appendChild(ngEl);
    };
    scriptElement.onerror = (error: any) => {
      console.log('ERROR: Could not load external application from: ' + fePluginUrl);
    };
    document.getElementsByTagName('body')[0].appendChild(scriptElement);
  }
}
