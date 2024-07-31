import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent  implements OnInit {
  public studentId!: any;
  activeTab: number | undefined;
  activeId = 1;
  loading = true;
  public studentsDetails: any;


  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    private apiService: ApiService, // Adjust based on your actual service implementation
    private toastr: ToastrService,

  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.studentId = params["id"];
      }
    });
  }
  getStudentsDetails(): void {
    this.loading = true;
    this.apiService.getStudentById(this.studentId)
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response.statusCode === 200) {
            if (response.result) {
              this.studentsDetails = response.result;
              console.log("Fetched single student details:", this.studentsDetails);  // Debugging
              // this.getMenuStatus(this.studentsDetails?.menuCodeId);
            } else {
              this.toastr.warning('No student details found', 'Warning');
              console.log('No records found:', response);
            }
          } else {
            this.toastr.error('Failed to fetch students details:', response.statusMessage);
            console.error('Failed response:', response);
          }
        },
        (error: any) => {
          this.loading = false;
          this.toastr.error('Error fetching students details:', error.message);
          console.error('Error fetching students details:', error);
        }
      );
  }
}