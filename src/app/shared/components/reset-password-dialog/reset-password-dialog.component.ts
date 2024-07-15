import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpServService } from '../../services/http-serv.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-open-doc-dialog',
  templateUrl: './reset-password-dialog.component.html',
  styleUrls: ['./reset-password-dialog.component.scss'],
})
export class ResetPasswordDialogComponent implements OnInit {
  @Input() title: any;
  @Input() body: any;

  username: any;

  public errorMessages: any;
  public activeModal: any;
  changePasswordForm: FormGroup;
  showPassword: boolean = false;

  constructor(
    activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private httpService: HttpServService
  ) {
    this.activeModal = activeModal;

    this.changePasswordForm = new FormGroup(
      {
        currentPassword: new FormControl('', [Validators.required]),
        newPassword: new FormControl('', [
          Validators.required,
          passwordComplexityValidator,
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchValidator }
    );
  }

  ngOnInit() {}

  close() {
    this.activeModal.close();
  }

  submitData() {
    this.changePassword();
    this.activeModal.close({
      message: 'success',
      newPassword: this.changePasswordForm.value.newPassword,
    });
  }
  changePassword() {
    const model = {
      currentPassword: this.changePasswordForm.value.currentPassword,
      newPassword: this.changePasswordForm.value.newPassword,
    };

    return this.httpService
      .postReq('portal/api/v1/systemuser/change/own/password', model)
      .subscribe((resp: any) => {
        if (resp['status'] === 0) {
          console.log('success reset pass');
          this.toastr.success(resp?.message, 'Success');
        } else {
        }
      });
  }

}

function passwordMatchValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (
    newPassword &&
    confirmPassword &&
    newPassword.value !== confirmPassword.value
  ) {
    return { passwordMismatch: true };
  }

  return null;
}

function passwordComplexityValidator(control: any) {
  const password = control.value;

  // Define your password complexity rules here
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
  const isLengthValid = password.length >= 8;

  // Check if the password meets the complexity requirements
  const isValid =
    hasNumber &&
    hasUppercase &&
    hasLowercase &&
    hasSpecialCharacter &&
    isLengthValid;

  // Return the validation result
  return isValid ? null : { passwordComplexity: true };
}
