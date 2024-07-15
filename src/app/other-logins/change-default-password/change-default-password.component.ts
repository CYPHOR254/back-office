import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { HttpServService } from '../../shared/services/http-serv.service';

@Component({
  selector: 'app-change-default-password',
  templateUrl: './change-default-password.component.html',
  styleUrls: ['./change-default-password.component.scss']
})
export class ChangeDefaultPasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isLoading: boolean = false;
  loginResp$: Observable<any> = of({});
  showPassword: boolean = false;

  constructor(
    private http: HttpServService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, passwordComplexityValidator]),
      confirmPassword: new FormControl('', [Validators.required])
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void {}

  submit() {
    this.isLoading = true;
    const { newPassword, currentPassword } = this.changePasswordForm.value;

    const model = {
      email: localStorage.getItem('username'),
      currentPassword: currentPassword,
      newPassword: newPassword
    };

    this.loginResp$ = this.http.postReq('portal/api/v1/systemuser/change/default/password', model).pipe(
      map((resp: any) => {
        this.isLoading = false;
        if (resp.status === 0) {
          this.toastr.success(resp.message, 'Success');
          localStorage.clear();
          this.router.navigate(['/login']);
        } else {
          this.toastr.error(resp.message, 'Error');
          return throwError(() => new Error(resp.message));
        }
        return resp;
      }),
      catchError((err) => {
        this.isLoading = false;
        this.toastr.error(err.error?.message || err.message, 'Failed');
        return of({});
      })
    );
  }
}

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }

  return null;
}

function passwordComplexityValidator(control: AbstractControl) {
  const password = control.value;
  const hasNumber = /\d/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLengthValid = password.length >= 8;

  const isValid = hasNumber && hasUppercase && hasLowercase && hasSpecialCharacter && isLengthValid;
  return isValid ? null : { passwordComplexity: true };
}
