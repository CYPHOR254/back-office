import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../api.service'; // Adjust path based on your project structure

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
      const adminId = this.formData.adminId; // Assuming adminId is part of formData
      const updatedAdminData = this.form.value;

      this.apiService.updateSystemAdmin(adminId, updatedAdminData).subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success('Admin updated successfully', 'Success');
          this.activeModal.close({ status: 'success', data: response });
        },
        (error) => {
          this.isLoading = false;
          console.error('Error updating admin:', error);
          this.toastr.error('Failed to update admin', 'Error');
        }
      );
    }
  }
}
