import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Observable, map, throwError, catchError, of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { HttpServService } from "../../shared/services/http-serv.service";

@Component({
  selector: "app-customer-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  isLoading: boolean = false;
  loginResp$: Observable<any> = of({});
  showPassword: boolean = false;

  constructor(
    private http: HttpServService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.changePasswordForm = new FormGroup(
      {
        currentPassword: new FormControl("", [Validators.required]),
        newPassword: new FormControl("", [
          Validators.required,
          passwordComplexityValidator,
        ]),
        confirmPassword: new FormControl("", [Validators.required]),
      },
      { validators: passwordMatchValidator }
    );
  }

  ngOnInit(): void {}

  submit() {
    this.isLoading = true;
    const { newPassword, currentPassword } = this.changePasswordForm.value;
    const model = {
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    this.loginResp$ = this.http
      .postReq("portal/api/v1/systemuser/change/own/password", model)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          if (resp["status"] === 0) {
            this.toastr.success(resp?.message, "Success");
            let myProfile = localStorage.getItem("profile");
            console.log("myProfile");
            console.log(myProfile);
            localStorage.clear();
            this.router.navigate(["/login"]);
     

            return resp;
          } else {
            this.toastr.error(resp?.message, "Error");
            throwError(() => resp["message"]);
          }
          this.isLoading = false;
        }),
        catchError((err) => {
          console.error(err);

          this.isLoading = false;
          if (err["error"] !== undefined) {
            this.toastr.error(err["error"]["message"], "Failed");
          } else {
            this.toastr.error(
              err["statusText"]
                ? err["statusText"]
                : err["message"] || err["error"]["message"],
              "Failed"
            );
          }
          return of({});
        })
      );
  }


}

function passwordMatchValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const newPassword = control.get("newPassword");
  const confirmPassword = control.get("confirmPassword");

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
