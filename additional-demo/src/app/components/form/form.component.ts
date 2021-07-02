import { Component, OnInit } from '@angular/core';
import { Hero } from '../../model/hero';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {

  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];
  powersObj = [
    {
      label: 'Really Smart'
    },
    {
      label: 'Super Flexible'
    },
    {
      label: 'Super Hot'
    },
    {
      label: 'Weather Changer'
    }
  ];

  model = new Hero(18, 'Dr IQ', this.powers[0], 'Chuck Overstreet');

  updateForm = new FormGroup({
    name: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
    power: new FormControl('', [
        Validators.required,
      ]),
    alterEgo: new FormControl('', [
        Validators.required,
      ]),
  });
  constructor() {
    this.updateModel();
  }

  updateModel() {
    this.updateForm.patchValue({
      name: this.model.name,
      power: this.model.power,
      alterEgo: this.model.alterEgo
    });
   }
  onSubmitReactive() {
    this.model.name = this.updateForm.value.name;
    this.model.alterEgo = this.updateForm.value.alterEgo;
    this.model.power = this.updateForm.value.power;
  }
  onSubmitTemplate() {
    this.updateModel();
  }
}
