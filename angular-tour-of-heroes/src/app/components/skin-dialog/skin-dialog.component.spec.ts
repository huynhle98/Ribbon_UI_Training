import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinDialogComponent } from './skin-dialog.component';

describe('SkinDialogComponent', () => {
  let component: SkinDialogComponent;
  let fixture: ComponentFixture<SkinDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkinDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
