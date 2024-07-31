import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../api.service'; // Adjust path based on your project structure

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.scss']
})
export class EditAgentComponent implements OnInit {
  @Input() formData: any; // Data to populate the form for editing
  form!: FormGroup; // Form group instance
  title: string = ''; // Title for the modal
  isLoading: boolean = false; // Flag to indicate loading state

  constructor(
    public activeModal: NgbActiveModal, // Modal control
    private fb: FormBuilder, // FormBuilder for creating forms
    private apiService: ApiService, // API service for backend communication
    private toastr: ToastrService // Toastr for notifications
  ) { }

  ngOnInit(): void {
    // Initialize the form with validation
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationalId: [0, [Validators.required, Validators.min(0)]],
      phoneNo: ['', Validators.required],
      agencyName: ['', Validators.required],
      EmergencyContact: ['', Validators.required]
    });

    // Set the title and populate the form if editing
    if (this.formData) {
      this.form.patchValue(this.formData);
      this.title = 'Edit Agent';
    } else {
      this.title = 'Add Agent';
    }
  }

  closeModal() {
    this.activeModal.dismiss('Cross click'); // Dismiss the modal
  }

  submitData() {
    if (this.form.valid) {
      this.isLoading = true;
  
      const agentId = this.formData?.agentId; // Assuming agentId is part of formData
      const updatedAgentData = this.form.value;
  
      // Call the API to update or add the agent
      this.apiService.updateAgent(agentId, updatedAgentData).subscribe(
        (response) => {
          console.log('API response:', response); // Log the response
          this.isLoading = false;
          this.toastr.success('Agent updated successfully', 'Success');
          this.activeModal.close({ status: 'success', data: response });
        },
        (error) => {
          this.isLoading = false;
          console.error('Error updating agent:', error);
          this.toastr.error('Failed to update agent', 'Error');
        }
      );
    }
  }

}