import { Component, Input } from '@angular/core';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent {
  @Input() label: string = 'Password';
  @Input() formControlName!: string;
  @Input() id!: string;

  showPassword: boolean = false;

  constructor(public controlName: FormControlName) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
