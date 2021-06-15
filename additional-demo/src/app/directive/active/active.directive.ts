import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appActive]'
})
export class ActiveDirective {

  constructor(private el: ElementRef) { }

}
