import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOverComponent } from './loading-over.component';

describe('LoadingOverComponent', () => {
  let component: LoadingOverComponent;
  let fixture: ComponentFixture<LoadingOverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingOverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
