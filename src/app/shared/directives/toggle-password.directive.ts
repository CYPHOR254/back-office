// toggle-password.directive.ts

import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]'
})
export class TogglePasswordDirective {

  private showDuration: number = 500; // 5 seconds

  constructor(private el: ElementRef) {}

  @HostListener('click')
  onClick() {
    const input = this.el.nativeElement.previousElementSibling;
    input.type = 'text'; // Show password temporarily

    // Automatically revert to password type after showDuration
    setTimeout(() => {
      input.type = 'password'; // Hide password again
    }, this.showDuration);
  }
}
