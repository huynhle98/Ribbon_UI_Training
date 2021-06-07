import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeroTypeListComponent } from './hero-type-list.component';

describe('HeroTypeListComponent', () => {
  let component: HeroTypeListComponent;
  let fixture: ComponentFixture<HeroTypeListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
