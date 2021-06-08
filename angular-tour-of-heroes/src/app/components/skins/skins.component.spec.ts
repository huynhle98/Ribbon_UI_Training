import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SkinsComponent } from './skins.component';

describe('SkinsComponent', () => {
  let component: SkinsComponent;
  let fixture: ComponentFixture<SkinsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});