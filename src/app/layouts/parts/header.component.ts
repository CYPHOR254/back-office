import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import {HttpServService} from "../../shared/services/http-serv.service";
import {Router} from "@angular/router";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ResetPasswordDialogComponent } from 'src/app/shared/components/reset-password-dialog/reset-password-dialog.component';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public modalRef!: NgbModalRef;
  isLoading: boolean = false;
  userName: any;
  profile: any;

  changePasswordForm: FormGroup;

  notifications: any;

  totalRecords = 0;
  @Input() formData: any;
  lastLogin: string | null | undefined;
  lastLoginDate:string | null | undefined;
  lastLoginTime:string | null | undefined;
  sidebarOpen: boolean | undefined;


  constructor(@Inject(DOCUMENT) private document: Document,
              private httpService: HttpServService,
              private router: Router,
              private modalService: NgbModal,
              private toastr: ToastrService,

              ) 
              
   {
    
    this.changePasswordForm = new FormGroup({
     currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, passwordComplexityValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: passwordMatchValidator });
  }

  ngOnInit(): void {
    this.lastLogin = localStorage.getItem("lastLogin");


    if (this.lastLogin) {
      const dateTimeParts = this.lastLogin.split("T");
      this.lastLoginDate = dateTimeParts[0];
      this.lastLoginTime = dateTimeParts[1];
    }
    this.sidebarOpen = false;

  }

  toggleSidebar() {
   

    const kl = "toggle-sidebar";
    
    // Toggle sidebar class on body element
    if (this.document.body.classList.contains(kl)) {
      this.document.body.classList.remove(kl);
    } else {
      this.document.body.classList.add(kl);
    }

    this.sidebarOpen = !this.sidebarOpen;
  }
  logOutUser() {
    localStorage.clear();
  }

  openUserProfileModal() {
    const modalRef = this.modalService.open(UserProfileComponent);
    modalRef.componentInstance.userName = this.userName;
    modalRef.componentInstance.profile = this.profile;
  }
  changePassword(){
    
    this.modalRef = this.modalService.open(ResetPasswordDialogComponent, {
      centered: true, animation: true,
    });
  
    this.modalRef.componentInstance.formData = '';
    this.modalRef.componentInstance.title = "Change Password";
    this.modalRef.componentInstance.body = "";

    this.modalRef.result.then((result) => {
      if (result === 'success') {
      this.isLoading = true;
      const { newPassword,currentPassword } = this.changePasswordForm.value;
    
       const model = {
        currentPassword:currentPassword,
         newPassword: newPassword
       }
    
 
    
    
        this.httpService.postReq('portal/api/v1/systemuser/change/own/password', model).subscribe(
          (result: any) => {
            if (result.status === 0) {
              
              this.toastr.success(result?.message, 'Success');
              console.log('result')
            } else {
              
              this.toastr.error(result?.message, 'Error');
    
            }
          }
        );
    



      }
    }, (reason) => {
      console.log(reason);
    });
  }



  openTask(notification: any) {
    let taskRefArr = notification?.taskReference?.split(":")

    this.router.navigate([`/invoices/view-invoice/${taskRefArr[0]}`]);
  }

  
}

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
    return { 'passwordMismatch': true };
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
  const isValid = hasNumber && hasUppercase && hasLowercase && hasSpecialCharacter && isLengthValid;

  // Return the validation result
  return isValid ? null : { 'passwordComplexity': true };
}


