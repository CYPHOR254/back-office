import { Component, Input, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Subscription } from "rxjs";
// import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/api.service";
@Component({
  selector: 'app-view-teacher-basic-info',
  templateUrl: './view-teacher-basic-info.component.html',
  styleUrls: ['./view-teacher-basic-info.component.scss']
})
export class ViewTeacherBasicInfoComponent implements OnInit {
  @Input() formData: any;
  @Input() teacherId!: any | undefined;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "teachers ";
  actions = ["Viewteacher"];
  filteredRows: any = [];
  totalRecords: number = 0;

  ColumnMode = ColumnMode;
  
  subs: Subscription[] = [];
  total: any;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public form!: FormGroup;
  public teachersDetails: any;


  constructor(
    // private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    private apiService: ApiService // Adjust based on your actual service implementation

  ) {}

   columns = [
    { name: "ID", prop: "teacherId" },
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
  

  allColumns = [...this.columns];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.teacherId = params["id"];
      }
    });

    this.getTeachersDetails();
  }


  getTeachersDetails(): void {
    this.loading = true;
    this.apiService.getTeacherById(this.teacherId)
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response.statusCode === 200) {
            if (response.result) {
              this.teachersDetails = response.result;
              console.log("Fetched single teacher details:", this.teachersDetails);  // Debugging
              // this.getMenuStatus(this.teachersDetails?.menuCodeId);
            } else {
              this.toastr.warning('No teacher details found', 'Warning');
              console.log('No records found:', response);
            }
          } else {
            this.toastr.error('Failed to fetch teachers details:', response.statusMessage);
            console.error('Failed response:', response);
          }
        },
        (error: any) => {
          this.loading = false;
          this.toastr.error('Error fetching teachers details:', error.message);
          console.error('Error fetching teachers details:', error);
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
