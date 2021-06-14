import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartIcoComponent } from './shopping-cart-ico.component';

describe('ShoppingCartIcoComponent', () => {
  let component: ShoppingCartIcoComponent;
  let fixture: ComponentFixture<ShoppingCartIcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingCartIcoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
