import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../../api.service'; // Adjust path based on your project structure
import { EditSystemAdminComponent } from '../edit-system-admin/edit-system-admin.component';
import { ToastrService } from 'ngx-toastr';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-add-system-admin',
  templateUrl: './add-system-admin.component.html',
  styleUrls: ['./add-system-admin.component.scss']
})
export class AddSystemAdminComponent implements OnInit {
  @Input() formData: any;
  form!: FormGroup;
  title!: string;
  isLoading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService ,// Ensure this line is added
    private apiService: ApiService // Adjust based on your actual service implementation
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
      profileId: [1] // Setting profileId to 1 for system admin
    });

    if (this.formData) {
      this.form.patchValue(this.formData);
      this.title = 'Edit Agent';
    } else {
      this.title = 'Add Agent';
    }
  }

  openEditSystemAdminModal(formData: any) {
    const modalRef = this.modalService.open(EditSystemAdminComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.formData = formData;

    modalRef.result.then((result) => {
      if (result.status === 'success') {
        // Handle the success result
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  submitData() {
    if (this.form.valid) {
      this.isLoading = true;
      const formData = this.form.value;
  
      this.apiService.addSystemAdmins(formData).subscribe(
        (response) => {
          this.isLoading = false;
          // Handle the success result
          this.activeModal.close({ status: 'success', data: response });
        },
        (error) => {
          this.isLoading = false;
          console.error('Error adding system admin:', error);
          // Handle error as per your application's requirements
          // Example: Show an error message using Toastr or log errors
          this.toastr.error('Failed to add system admin.', 'Error');
        }
      );
    }
  }
  
}
