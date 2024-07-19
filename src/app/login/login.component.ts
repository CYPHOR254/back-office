import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpServService } from '../shared/services/http-serv.service'; // This import seems unused
import { VersionService } from 'src/app/shared/services/version.service';
import { ApiService } from '../api.service'; // Adjust the path as necessary

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;
  version: string = '';
  returnUrl: any;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private versionService: VersionService,
    private route: ActivatedRoute

  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    console.log(this.returnUrl);
    
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
      email: email.trim(),
      password: password
    };
    this.apiService.login(payload).subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        if (resp.statusCode === 0) {
          console.log('access_token', resp.result.jwtToken);
          // localStorage.setItem('jwtToken', resp.result.jwtToken);
           localStorage.setItem('access_token', resp.result.jwtToken);           
          this.router.navigate(['/dashboard/admin-dashboard']);
          this.toastr.success('Authenticated successfully', 'Success');
        } else {
          this.toastr.error(resp.statusMessage, 'Error');
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error(err);
        if (err.error?.message) {
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
