import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroTypeListComponent } from './hero-type-list.component';

describe('HeroTypeListComponent', () => {
  let component: HeroTypeListComponent;
  let fixture: ComponentFixture<HeroTypeListComponent>;

  beforeEach(async(() => {
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
