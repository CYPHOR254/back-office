import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../api.service'; // Adjust path based on your project structure

@Component({
  selector: 'app-edit-teacher',
  templateUrl: './edit-teacher.component.html',
  styleUrls: ['./edit-teacher.component.scss']
})
export class EditTeacherComponent implements OnInit {
  @Input() formData: any;
  title: string = "Edit Teacher";
  teacherForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService // Adjust based on your actual service implementation
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      schoolName: [this.formData.schoolName, Validators.required],
      firstName: [this.formData.firstName, Validators.required],
      middleName: [this.formData.middleName],
      lastName: [this.formData.lastName, Validators.required],
      phoneNo: [this.formData.phoneNo, Validators.required],
      nationalId: [this.formData.nationalId, Validators.required],
      email: [this.formData.email, [Validators.required, Validators.email]],
      gender: [this.formData.gender, Validators.required],
      nationality: [this.formData.nationality, Validators.required],
      dateOfBirth: [this.convertDateToISO(this.formData.dateOfBirth), Validators.required],
      tscNo: [this.formData.tscNo, Validators.required],
      yearsOfExperience: [this.formData.yearsOfExperience, [Validators.required, Validators.min(0)]],
      profileId:6
    });
  }

  convertDateToISO(dateString: string): string {
    const [month, day, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      const teacherData = this.teacherForm.value;
      this.apiService.updateTeacher(this.formData.teacherId, teacherData).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.toastr.success('Teacher updated successfully', 'Success');
            this.activeModal.close('success');
          } else {
            this.toastr.error('Failed to update teacher', 'Error');
          }
        },
        (error) => {
          this.toastr.error('Failed to update teacher', 'Error');
          console.error('Error updating teacher:', error);
        }
      );
    }
  }
}
