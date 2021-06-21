import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Items } from '../../data/items';

@Component({
  selector: 'app-lib-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() items = [];

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onMinusEvent = new EventEmitter<any>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onPlusEvent = new EventEmitter<any>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onRemoveEvent = new EventEmitter<any>();
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onShoppingNow = new EventEmitter<any>();

  constructor() {
    // this.items = Items;
  }

  ngOnInit(): void {
  }

  onMinusItem(event) {
    this.onMinusEvent.emit(event);
  }
  onPlusItem(event) {
    this.onPlusEvent.emit(event);
  }
  onShopping(event) {
    this.onShoppingNow.emit(event);
  }
  onRemoveItem(event) {
    this.onRemoveEvent.emit(event);
  }
}
