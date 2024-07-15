// import { Component, OnInit } from "@angular/core";
// import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
// import { Observable, map, catchError, of } from "rxjs";
// import { HttpServService } from "../shared/services/http-serv.service";
// import { ToastrService } from "ngx-toastr";
// import { Router } from "@angular/router";
// import { CompanyEmailValidator } from "../shared/validators/CompanyEmailValidators";
// import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
// import { VersionService } from "src/app/shared/services/version.service";

// @Component({
// 	selector: "app-login",
// 	templateUrl: "./login.component.html",
// 	styleUrls: ["./login.component.scss"],
// })
// export class LoginComponent implements OnInit {
// 	public modalRef!: NgbModalRef;

// 	loginForm: FormGroup;
// 	isLoading: boolean = false;
// 	showPassword: boolean = false;
// 	loginResp$: Observable<any> = of({});
// 	systemUserList$: Observable<any> = of({});
// 	rows: any = [];
// 	loading: boolean = true;
// 	version!: string;


// constructor(
//   private http: HttpServService,
//   private toastr: ToastrService,
//   private router: Router,
//   private versionService: VersionService,
//   private formBuilder: FormBuilder
// ) {
//   this.loginForm = this.formBuilder.group({
//     email: ['', [Validators.required, CompanyEmailValidator.mustBeEmail]],
//     password: ['', Validators.required]
//   });
// }


// 	ngOnInit(): void {
// 		this.versionService.getVersion().subscribe({
// 			next: (data) => (this.version = data.version),
// 			error: (err) => console.error("Error fetching version:", err),
// 		});
// 	}

// 	submit() {
// 		this.isLoading = true;
// 		const { email, password } = this.loginForm.value;
// 		let payload = {
// 			username: email.trim(),
// 			password: password,
// 			channel: "PORTAL",
// 		};

// 		this.loginResp$ = this.http
// 			.loginReq("portal/api/v1/auth/login", payload)
// 			.pipe(
// 				map((resp: any) => {
// 					this.isLoading = false;
// 					if (resp["status"] === 0) {
// 						localStorage.setItem("profile", resp["data"]["profile"]);
// 						localStorage.setItem("access_token", resp.data.access_token);
// 						localStorage.setItem("firstTimeLogin", resp.data.firstTimeLogin);
// 						localStorage.setItem("username", resp.data.username);
// 						localStorage.setItem("id", resp.data.id);
// 						localStorage.setItem("lastLogin", resp.data.lastLogin);


// 						if (resp["data"]["firstTimeLogin"]) {
// 							this.router.navigate(["/change-default-password"]);
// 						} else {
// 							this.router.navigate(["/dashboard/admin-dashboard"]);
// 						}

// 						this.toastr.success(resp?.message, "Success");
// 					} else {
// 						this.toastr.error(resp?.message, "Error");
// 					}
// 				}),
// 				catchError((err) => {
// 					console.error(err);
// 					this.isLoading = false;
// 					if (err?.error?.message) {
// 						this.toastr.error(err.error.message, "Login Failure");
// 					} else if (err?.message) {
// 						this.toastr.error(err.message, "Login Failure");
// 					} else {
// 						this.toastr.error(
// 							"An unexpected error occurred. Please try again.",
// 							"Login Failure"
// 						);
// 					}
// 					return of({});
// 				})
// 			);
// 	}

// 	resetPassword() {
// 		this.router.navigate(["forgot-password"]);
// 	}



// 	togglePasswordVisibility(): void {
// 		this.showPassword = !this.showPassword;
// 	}
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpServService } from '../shared/services/http-serv.service';
import { VersionService } from 'src/app/shared/services/version.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  version: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpServService,
    private toastr: ToastrService,
    private router: Router,
    private versionService: VersionService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    this.versionService.getVersion().subscribe({
      next: (data) => this.version = data.version,
      error: (err) => console.error('Error fetching version:', err)
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  submit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    const payload = {
      username: email.trim(),
      password: password,
      channel: 'PORTAL'
    };

    this.httpService.loginReq('portal/api/v1/auth/login', payload).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        if (resp.status === 0) {
          localStorage.setItem('profile', resp.data.profile);
          localStorage.setItem('access_token', resp.data.access_token);
          localStorage.setItem('firstTimeLogin', resp.data.firstTimeLogin);
          localStorage.setItem('username', resp.data.username);
          localStorage.setItem('id', resp.data.id);
          localStorage.setItem('lastLogin', resp.data.lastLogin);

          if (resp.data.firstTimeLogin) {
            this.router.navigate(['/change-default-password']);
          } else {
            this.router.navigate(['/dashboard/admin-dashboard']);
          }
          this.toastr.success(resp.message, 'Success');
        } else {
          this.toastr.error(resp.message, 'Error');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        if (err.error.message) {
          this.toastr.error(err.error.message, 'Login Failure');
        } else if (err.message) {
          this.toastr.error(err.message, 'Login Failure');
        } else {
          this.toastr.error('An unexpected error occurred. Please try again.', 'Login Failure');
        }
      }
    });
  }

  resetPassword() {
    this.router.navigate(['forgot-password']);
  }

  togglePasswordVisibility(): void {
    const passwordField = document.getElementById('password') as HTMLInputElement;
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  }
}
