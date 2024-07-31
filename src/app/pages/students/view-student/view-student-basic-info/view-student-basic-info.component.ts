// import { Component, Input, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
// import { ColumnMode } from '@swimlane/ngx-datatable';
// import { ToastrService } from 'ngx-toastr';
// import { Subscription } from 'rxjs';
// import { ApiService } from 'src/app/api.service';

// @Component({
//   selector: 'app-view-student-basic-info',
//   templateUrl: './view-student-basic-info.component.html',
//   styleUrls: ['./view-student-basic-info.component.scss']
// })
// export class ViewStudentBasicInfoComponent implements OnInit {
//   @Input() formData: any;
//   @Input() studentId!: any | undefined;

//   breadCrumbItems!: Array<{}>;
//   rows: any = [];
//   loading = true;
//   reorderable = true;
//   title: string = "students ";
//   actions = ["Viewstudent"];
//   filteredRows: any = [];
//   totalRecords: number = 0;

//   ColumnMode = ColumnMode;
  
//   subs: Subscription[] = [];
//   total: any;
//   public currentUser: any;
//   public modalRef!: NgbModalRef;
//   public form!: FormGroup;
//   public studentsDetails: any;


//   constructor(
//     // private httpService: HttpServService,
//     public activatedRoute: ActivatedRoute,
//     public fb: FormBuilder,
//     private toastr: ToastrService,
//     public router: Router,
//     private apiService: ApiService // Adjust based on your actual service implementation

//   ) {}

//    columns = [
//     { name: "ID", prop: "studentId" },
//     { name: "First Name", prop: "firstName" },
//     { name: "Middle Name", prop: "middleName" },
//     { name: "Last Name", prop: "lastName" },
//     { name: "Phone Number", prop: "phoneNo" },
//     { name: "National ID", prop: "nationalId" },
//     { name: "Email", prop: "email" },
//     { name: "Gender", prop: "gender" },
//     { name: "Nationality", prop: "nationality" },
//     { name: "Date of Birth", prop: "dateOfBirth" },
//     { name: "TSC No.", prop: "tscNo" },
//     { name: "Years of Experience", prop: "yearsOfExperience" },
//     { name: "Actions", prop: "actions" },
//   ];
  

//   allColumns = [...this.columns];

//   ngOnInit(): void {
//     this.activatedRoute.params.subscribe((params) => {
//       if (typeof params["id"] !== "undefined") {
//         this.studentId = params["id"];
//       }
//     });

//     this.getstudentsDetails();
//   }


//   getstudentsDetails(): void {
//     this.loading = true;
//     this.apiService.getStudentById(this.studentId)
//       .subscribe(
//         (response: any) => {
//           this.loading = false;
//           if (response.statusCode === 200) {
//             if (response.result) {
//               this.studentsDetails = response.result;
//               console.log("Fetched single student details:", this.studentsDetails);  // Debugging
//               // this.getMenuStatus(this.studentsDetails?.menuCodeId);
//             } else {
//               this.toastr.warning('No student details found', 'Warning');
//               console.log('No records found:', response);
//             }
//           } else {
//             this.toastr.error('Failed to fetch students details:', response.statusMessage);
//             console.error('Failed response:', response);
//           }
//         },
//         (error: any) => {
//           this.loading = false;
//           this.toastr.error('Error fetching students details:', error.message);
//           console.error('Error fetching students details:', error);
//         }
//       );
//   }
  

//   getFullName(firstName: any,middleName :any, lastName: any) {
//     let fullname: string = `${firstName} ${middleName} ${lastName}`;
//     fullname.toUpperCase;
//     fullname = fullname.slice(0, 16);
//     return fullname;
//   }

//   ngOnDestroy(): void {
//     this.subs.forEach((sub) => sub.unsubscribe());
//   }
// }

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-view-student-basic-info',
  templateUrl: './view-student-basic-info.component.html',
  styleUrls: ['./view-student-basic-info.component.scss']
})
export class ViewStudentBasicInfoComponent implements OnInit {
  @Input() formData: any;
  @Input() studentId!: any | undefined;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "students ";
  actions = ["Viewstudent"];
  filteredRows: any = [];
  totalRecords: number = 0;

  ColumnMode = ColumnMode;
  
  subs: Subscription[] = [];
  total: any;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public form!: FormGroup;
  public studentsDetails: any;


  constructor(
    // private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    private apiService: ApiService // Adjust based on your actual service implementation

  ) {}

   student = [
    // { name: "ID", prop: "studentId" },
    { name: "First Name", prop: "firstName" },
    { name: "Middle Name", prop: "middleName" },
    { name: "Last Name", prop: "lastName" },
    { name: "Phone Number", prop: "phoneNo" },
    { name: "National ID", prop: "nationalId" },
    { name: "Email", prop: "email" },
    { name: "Gender", prop: "gender" },
    { name: "Nationality", prop: "nationality" },
    { name: "Date of Birth", prop: "dateOfBirth" },
    { name: "TSC No.", prop: "tscNo" },
    { name: "Years of Experience", prop: "yearsOfExperience" },
    { name: "Actions", prop: "actions" },
  ];
  

  allColumns = [...this.student];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.studentId = params["id"];
      }
    });

    this.getstudentsDetails();
  }


  getstudentsDetails(): void {
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
  

  getFullName(firstName: any,middleName :any, lastName: any) {
    let fullname: string = `${firstName} ${middleName} ${lastName}`;
    fullname.toUpperCase;
    fullname = fullname.slice(0, 16);
    return fullname;
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}


// import { Component, Input } from '@angular/core';

//  @Component({
//    selector: 'app-view-student-basic-info',
//    templateUrl: './view-student-basic-info.component.html',
//    styleUrls: ['./view-student-basic-info.component.scss']
//  })
// export class ViewStudentBasicInfoComponent {
//     @Input() studentId!: any | undefined;

//   student = {
//     name: 'Rajib Rajab',
//     admissionNumber: 'BS2066',
//     status: 'Active',
//     gender: 'Male',
//     nationalityFlag: 'path_to_flag.png',
//     sponsorship: 'None',
//     modeOfLearning: 'Boarding',
//     dateOfBirth: '2017-12-03',
//     admissionDate: '2017-12-03',
//     uniqueId: '40540',
//     healthConcerns: 'None',
//     waiverDiscount: 'None',
//     outstandingBalance: 'KSH 0.00',
//     credit: 'KSH 0.00',
//     photo: 'path_to_photo.jpg'
//   };

//   changePhoto() {
//     // Implement photo change logic
//   }

//   viewStatement() {
//     // Implement view statement logic
//   }
// }

