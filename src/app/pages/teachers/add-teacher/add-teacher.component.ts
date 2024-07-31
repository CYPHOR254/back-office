import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../api.service'; // Adjust path based on your project structure
import { Profile } from '../../rbac/models/profile';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  title: string = "Add Teacher";
  teacherForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private apiService: ApiService // Adjust based on your actual service implementation
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNo: ['', Validators.required],
      nationalId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      tscNo: ['', Validators.required],
      yearsOfExperience: [0, [Validators.required, Validators.min(0)]],
      ProfileId: [6, Validators.required], // Ensure ProfileId is included and required if necessary
      schoolId: [3, Validators.required]    // Ensure schoolId is included and required if necessary
    });
    
  }

  closeModal() {
    this.activeModal.dismiss('Cross click');
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      const teacherData = this.teacherForm.value;
      console.log('Teacher Data:', teacherData); // Log form data to console
      this.apiService.addTeacher(teacherData).subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.toastr.success('Teacher added successfully', 'Success');
            this.activeModal.close('success');
          } else {
            this.toastr.error('Failed to add teacher', 'Error');
          }
        },
        (error) => {
          this.toastr.error('Failed to add teacher', 'Error');
          console.error('Error adding teacher:', error); // Log error to console
        }
      );
    }
  }
  
}
