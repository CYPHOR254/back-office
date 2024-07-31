import {
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup} from "@angular/forms";
import { ColumnMode, id } from "@swimlane/ngx-datatable";
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  TimeoutError,
} from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/api.service";

@Component({
  selector: "app-list-schools",
  templateUrl: "./list-schools.component.html",
  styleUrls: ["./list-schools.component.scss"],
})
export class ListSchoolsComponent implements OnInit {
  @Input() formData: any;
  @Input() agentId: any | undefined;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "Schools by School";
  actions = ["View School"];
  filteredRows: any = [];
  totalRecords: number = 0;
  viewedSchool: any;
  ColumnMode = ColumnMode;
  subs: Subscription[] = [];
  total: any;

  public form!: FormGroup;
  public currentUser: any;
  public imageFile!: File;
  public modalRef!: NgbModalRef;
  public SchoolDetails: any;

  constructor(
    private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    private toastr: ToastrService,
    private apiService: ApiService
  ) {}

  columns = [
    // { name: "School ID", prop: "schoolId" },
    { name: "School Name", prop: "schoolName" },
    { name: "School Gender", prop: "schoolGender" },
    { name: "Curriculum", prop: "curriculum" },
    { name: "Resource", prop: "resource" },
    { name: "School Type", prop: "schoolType" },
    { name: "Category", prop: "category" },
    { name: "Email Address", prop: "emailAddress" },
    { name: "Mobile No", prop: "mobileNo" },
    // { name: "Postal Address", prop: "postalAddress" },
    // { name: "Postal Code", prop: "postalCode" },
    { name: "MOE Registration No", prop: "moeRegistrationNo" },
    { name: "County", prop: "county" },
    { name: "SubCounty", prop: "subCounty" },
    // { name: "Logo", prop: "logo" },
    // { name: "Longitude", prop: "longitude" },
    // { name: "Latitude", prop: "latitude" },
    { name: "Status", prop: "status" },
    // { name: "School Admin Email", prop: "schoolAdminEmail" }
  ];
  

  allColumns = [...this.columns];

  schoolList$: Observable<any> = of([]);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.agentId = params["id"];
      }
    });

    this.fetchSchools();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  fetchSchools() {
    this.loading = true;
    this.apiService.getSchoolsAddedByAgent(this.agentId).pipe(
      catchError(error => {
        this.toastr.error('Failed to fetch agent admins', 'Error');
        this.loading = false;
        return of([]);
      })
    ).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.rows = response.result;
        this.filteredRows = this.rows;
        this.totalRecords = this.rows.length;
        this.toastr.success('Fetched schools added by  agent  successfully', 'Success');
      } else {
        this.toastr.error('Failed to fetch agent admins', 'Error');
      }
      this.loading = false;
    });
  }
  triggerEvent(data: string) { 
    let eventData = JSON.parse(data);
    this.viewedSchool = eventData["row"]["id"];

    if (eventData.action == "View") {
      this.router.navigate([`/schools/view-School/${this.viewedSchool}`]);
    }
  }
}
