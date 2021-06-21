import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'lib-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @Input() label = 'Button';
  @Output() onClick = new EventEmitter<Event>();

  constructor() { }

  ngOnInit(): void {
  }

}
