import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() primary = false;
  @Input() type = 'lb-btn--primary';
  @Input() backgroundColor?: string;
  @Input() size: 'small' | 'medium' | 'large' = 'medium';

  @Input() label = 'Button';

  @Output() onClick = new EventEmitter<Event>();

  public get classes(): string[] {
    // const mode = this.primary ? 'lb-btn--primary' : 'lb-btn--secondary';
    return ['storybook-button', `storybook-button--${this.size}`, this.type];
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
