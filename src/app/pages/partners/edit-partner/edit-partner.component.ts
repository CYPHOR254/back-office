import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../api.service'; // Adjust the path based on your project structure

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent implements OnInit {
  @Input() title!: string;
  @Input() formData?: any; // Adjust based on actual data type

  isLoading: boolean = false;
  form!: FormGroup;
  resources: any[] = []; // Adjust the type based on your actual resource structure

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getResources(); // Fetch resources if needed
    this.initializeForm();
  }

  initializeForm(): void {
    // Debug: Log formData to check if fields are present
    console.log('FormData:', this.formData);

    // Find resource name using resourceId
    const resourceName = this.resources.find(res => res.resourceId === this.formData?.resourceId)?.resource || '';

    this.form = this.fb.group({
      firstName: [this.formData?.firstName || '', [Validators.required]],
      middleName: [this.formData?.middleName || '', [Validators.required]],
      lastName: [this.formData?.lastName || '', [Validators.required]],
      email: [this.formData?.email || '', [Validators.required, Validators.email]],
      nationalId: [this.formData?.nationalId || '', [Validators.required, Validators.minLength(1)]],
      phoneNo: [this.formData?.phoneNo || '', [Validators.required]],
      firmName: [this.formData?.firmName || '', [Validators.required]],
      emergencyContact: [this.formData?.emergencyContact || '', [Validators.required]],
      businessContact: [this.formData?.businessContact || '', [Validators.required]],
      businessEmail: [this.formData?.businessEmail || '', [Validators.required, Validators.email]],
      resource: [resourceName, [Validators.required]], // Set resource name here
      agreementStartDate: [this.formData?.agreementStartDate ? new Date(this.formData.agreementStartDate).toISOString().substring(0, 10) : '', [Validators.required]],
      agreementEndDate: [this.formData?.agreementEndDate ? new Date(this.formData.agreementEndDate).toISOString().substring(0, 10) : '', [Validators.required]]
    });

    // Debug: Log form values to check if they are being set correctly
    console.log('Form Initialized:', this.form.value);
  }

  getResources(): void {
    this.apiService.getResources().subscribe(
      (response: any) => {
        if (response.statusCode === 200 && Array.isArray(response.result)) {
          this.resources = response.result;
          this.initializeForm(); // Initialize form after resources are fetched
        } else {
          console.error('Failed to fetch resources', response);
        }
      },
      (error) => {
        console.error('Error fetching resources', error);
      }
    );
  }

  closeModal(): void {
    this.activeModal.dismiss('Cross click');
  }

  submitData(): void {
    if (this.form.valid) {
      this.isLoading = true;
      const partnerId = this.formData?.partnerId; // Ensure this is correct
      const resourceName = this.form.value.resource;
      const resourceId = this.resources.find(res => res.resource === resourceName)?.resourceId || 0;

      const updatedPartner = { ...this.form.value, resource: resourceId }; // Convert resource name to resourceId

      this.apiService.updatePartner(partnerId, updatedPartner).subscribe(
        (response) => {
          this.isLoading = false;
          this.toastr.success('Partner updated successfully', 'Success');
          this.activeModal.close({ status: 'success', data: response });
        },
        (error) => {
          this.isLoading = false;
          console.error('Error updating partner:', error);
          this.toastr.error('Failed to update partner', 'Error');
        }
      );
    }
  }
}
