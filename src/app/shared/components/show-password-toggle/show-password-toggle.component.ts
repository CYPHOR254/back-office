import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-show-password-toggle',
  templateUrl: './show-password-toggle.component.html',
  styleUrls: ['./show-password-toggle.component.scss']
})
export class ShowPasswordToggleComponent {

  @Input() showPassword: boolean = false;
}
