import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RibbonLibComponent } from './ribbon-lib.component';

describe('RibbonLibComponent', () => {
  let component: RibbonLibComponent;
  let fixture: ComponentFixture<RibbonLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RibbonLibComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RibbonLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
