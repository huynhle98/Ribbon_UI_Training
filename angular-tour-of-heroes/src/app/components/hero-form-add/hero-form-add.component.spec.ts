import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroFormAddComponent } from './hero-form-add.component';

describe('HeroFormAddComponent', () => {
  let component: HeroFormAddComponent;
  let fixture: ComponentFixture<HeroFormAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroFormAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
