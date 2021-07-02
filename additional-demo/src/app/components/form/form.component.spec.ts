import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async(() => {
    component.updateForm.controls.name.setValue('');
    component.updateForm.controls.alterEgo.setValue('');
    component.updateForm.controls.power.setValue('');
    expect(component.updateForm.valid).toBeFalsy();
  }));

  it('form should be valid', async(() => {
    component.updateForm.controls.name.setValue('Dr IQ');
    component.updateForm.controls.alterEgo.setValue('Chuck Overstreet');
    component.updateForm.controls.power.setValue('Really Smart');
    expect(component.updateForm.valid).toBeTruthy();
  }));

  it('form should be invalid', async(() => {
    component.updateForm.controls.name.setValue('Dr I');
    component.updateForm.controls.alterEgo.setValue('Chuck Overstreet');
    component.updateForm.controls.power.setValue('Really Smart');
    expect(component.updateForm.valid).toBeFalsy();
  }));
});
