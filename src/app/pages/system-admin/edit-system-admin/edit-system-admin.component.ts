import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-edit-system-admin',
  templateUrl: './edit-system-admin.component.html',
  styleUrls: ['./edit-system-admin.component.scss']
})
export class EditSystemAdminComponent implements OnInit {
  @Input() formData: any;
  form!: FormGroup;
  title!: string;
  isLoading: boolean = false;
  
  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationalId: [0, [Validators.required, Validators.min(0)]],
      phoneNo: ['', Validators.required],
      department: ['', Validators.required],
      officePhoneNo: ['', Validators.required],
      employmentNo: ['', Validators.required],
    });

    if (this.formData) {
      this.form.patchValue(this.formData);
      this.form.get('email')?.disable();
      this.title = 'Edit Admin';
    } else {
      this.title = 'Add Admin';
    }
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  submitData() {
    if (this.form.valid) {
      this.isLoading = true;
      const adminData = this.form.getRawValue(); // This includes disabled fields

      if (this.formData) {
        // Update existing admin
        this.apiService.updateSystemAdmin(this.formData.adminId, adminData).subscribe(
          (response) => this.handleSuccess(response, 'Admin updated successfully'),
          (error) => this.handleError(error, 'Failed to update admin')
        );
      } else {
        // Add new admin
        this.apiService.addSystemAdmins(adminData).subscribe(
          (response) => this.handleSuccess(response, 'Admin added successfully'),
          (error) => this.handleError(error, 'Failed to add admin')
        );
      }
    }
  }

  private handleSuccess(response: any, message: string): void {
    this.isLoading = false;
    this.toastr.success(message, 'Success');
    this.activeModal.close({ status: 'success', data: response });
  }

  private handleError(error: any, message: string): void {
    this.isLoading = false;
    console.error('Error:', error);
    this.toastr.error(message, 'Error');
  }
}