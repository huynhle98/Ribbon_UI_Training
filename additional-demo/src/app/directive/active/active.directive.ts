import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective implements OnChanges{

  @Input() appActive = false;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    if (this.appActive) {
      this.el.nativeElement.style.fontWeight = 600;
      this.el.nativeElement.style.borderColor = 'var(--blue-200)';
    }
    else {
      this.el.nativeElement.style = '';
    }
  }
}
