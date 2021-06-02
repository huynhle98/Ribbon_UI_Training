import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Event} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  pathCurrent = '';
  constructor(
    private location: Location,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      this.pathCurrent = this.location.path();
    })

  }
}
