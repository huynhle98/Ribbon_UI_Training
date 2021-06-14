import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIcoComponent } from './home-ico.component';

describe('HomeIcoComponent', () => {
  let component: HomeIcoComponent;
  let fixture: ComponentFixture<HomeIcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeIcoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
