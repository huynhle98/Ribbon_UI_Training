import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Event } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  title = 'Tour of Heroes';
  pathCurrent = '';

  constructor(
    private location: Location,
    private router: Router
  ) {
    this.router.events.subscribe((event: Event) => {
      this.pathCurrent = this.location.path();
    });
  }

  ngOnInit() {
  }

}
