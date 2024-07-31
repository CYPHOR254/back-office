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
  selector: "app-partner-details",
  templateUrl: "./partner-details.component.html",
  styleUrls: ["./partner-details.component.scss"],
})
export class PartnerDetailsComponent implements OnInit {
  @Input() formData: any;
  @Input() partnerId!: any | undefined;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "partners by Partner";
  actions = ["Viewpartner"];
  filteredRows: any = [];
  totalRecords: number = 0;

  ColumnMode = ColumnMode;
  
  subs: Subscription[] = [];
  total: any;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public form!: FormGroup;
  public partnerDetails: any;


  constructor(
    // private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private toastr: ToastrService,
    public router: Router,
    private apiService: ApiService // Adjust based on your actual service implementation

  ) {}

  columns = [
    { name: "ID", prop: "frontendId" },
    { name: "firstName", prop: "firstName" },
    { name: "middleName", prop: "middleName" },
    { name: "lastName", prop: "lastName" },
    { name: "phoneNumber", prop: "phoneNumber" },
    { name: "idNumber", prop: "idNumber" },
    { name: "resource", prop: "resource" },
    
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.partnerId = params["id"];
      }
    });

    this.getPartnerDetails();
  }


  getPartnerDetails(): void {
    this.loading = true;
    this.apiService.getPartnerById(this.partnerId)
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response.statusCode === 200) {
            this.partnerDetails = response.result;
            console.log("Fetched partner details:", this.partnerDetails);  // Debugging
            // this.getMenuStatus(this.partnerDetails?.menuCodeId);
          } else {
            this.toastr.error('Failed to fetch partner details:', response.message);
          }
        },
        (error: any) => {
          this.loading = false;
          this.toastr.error('Error fetching partner details:', error.message);
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
