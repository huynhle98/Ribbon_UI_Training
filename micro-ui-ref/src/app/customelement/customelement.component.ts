import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from '@angular/router';


@Component({
  selector: 'app-customelement',
  templateUrl: './customelement.component.html',
  styleUrls: ['./customelement.component.scss'],
  encapsulation: ViewEncapsulation.None // <- this allows CSS to bleed to this component from parent app
})
export class CustomelementComponent implements OnInit {

  @Input() route: string;  
  @Input() token: string;
  @Output() helloEvt: EventEmitter<string> = new EventEmitter();

  message: String = 'empty';

  constructor(private router: Router) { }

  // Detect new paramaters passed from parent application
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {

      // Check if route changed
      if (propName === 'route') {
        // Navigate to new route
        //const newRoute = JSON.stringify(changes['route'].currentValue);
        const newRoute = changes['route'].currentValue;
        console.log("New route passed from parent application: " + newRoute);
        this.router.navigate([newRoute]);
        this.message = ('Route changed to: ' + newRoute);
      }
    }
       

  }


  ngOnInit() {
    console.log('FM Web Component loaded. API Token: ' + this.token + '.  Route: ' + this.route);

  }

}
