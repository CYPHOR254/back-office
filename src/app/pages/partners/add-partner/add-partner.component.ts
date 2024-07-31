import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../api.service'; // Adjust path based on your project structure

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {
  @Input() formData: any;
  form!: FormGroup;
  title!: string;
  isLoading: boolean = false;
  resources: any[] = []; // Change the type to match your actual resource structure

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getResources();
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationalId: [0, [Validators.required, Validators.min(0)]],
      phoneNo: ['', Validators.required],
      firmName: ['', Validators.required],
      emergencyContact: ['', Validators.required],
      businessContact: ['', Validators.required],
      businessEmail: ['', [Validators.required, Validators.email]],
      agreementStartDate: ['', Validators.required],
      agreementEndDate: ['', Validators.required],
      resource: ['', Validators.required],
      profileId: [4]
    });

    if (this.formData) {
      this.form.patchValue(this.formData);
      this.title = 'Edit Partner';
    } else {
      this.title = 'Add Partner';
    }
  }

  getResources(): void {
    this.apiService.getResources().subscribe(
      (response: any) => {
        if (response.statusCode === 200 && Array.isArray(response.result)) {
          this.resources = response.result;
          console.log("Fetched resources", response.result);
        } else {
          console.error('Failed to fetch resources', response);
        }
      },
      (error) => {
        console.error('Error fetching resources', error);
      }
    );
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  submitData() {
    if (this.form.valid) {
      this.isLoading = true;
      const formData = this.form.value;

      this.apiService.addPartner(formData).subscribe(
        (response) => {
          this.isLoading = false;
          this.activeModal.close({ status: 'success', data: response });
          this.toastr.success('Partner added successfully.', 'Success');
          
        },
        (error) => {
          this.isLoading = false;
          console.error('Error adding partner:', error);
          this.toastr.error('Failed to add partner.', 'Error');
        }
      );
    }
  }
}
