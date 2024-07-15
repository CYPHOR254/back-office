import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationalId: [0, [Validators.required, Validators.min(0)]],
      phoneNo: ['', Validators.required],
      agencyName: ['', Validators.required],
      emergencyContact: ['', Validators.required]
    });

    if (this.formData) {
      this.form.patchValue(this.formData);
      this.title = 'Edit Agent';
    } else {
      this.title = 'Add Agent';
    }
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  submitData() {
    if (this.form.valid) {
      this.isLoading = true;
      // Perform submit actions here
      // For example, call a service to save the data

      // After the save operation
      this.isLoading = false;
      this.activeModal.close({ status: 'success', data: this.form.value });
    }
  }
}
