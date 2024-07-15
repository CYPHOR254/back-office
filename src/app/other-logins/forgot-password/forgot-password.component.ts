import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { CompanyEmailValidator } from "src/app/shared/validators/CompanyEmailValidators";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"],
})
export class ForgotPasswordComponent implements OnInit {
  public modalRef!: NgbModalRef;

  loginForm: FormGroup;
  isLoading: boolean = false;
  loginResp$: Observable<any> = of({});

  constructor(
    private http: HttpServService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        CompanyEmailValidator.mustBeEmail,
      ]),
    });
  }

  ngOnInit(): void {}

  submit() {
    this.isLoading = true;
    const { email } = this.loginForm.value;

    let model = {
      email,
    };
    this.http
      .postReqBasic("portal/api/v1/auth/forgot/password", model)
      .subscribe((res: any) => {
        if (res?.status === 0) {
          this.toastr.success(res?.message, "Success");
          this.router.navigate(["/forgot-reset-password?token=123"]);
        } else {
          this.toastr.error(res?.message, "Error");
        }
      });
  }

  backToLogin() {
    this.router.navigate(["/login"]);
  }
}
