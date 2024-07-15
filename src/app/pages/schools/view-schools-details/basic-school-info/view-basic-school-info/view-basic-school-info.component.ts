import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { PartnerActionDialogComponent } from "src/app/shared/components/partner-action-dialog/partner-action-dialog.component";

@Component({
  selector: "app-view-basic-school-info",
  templateUrl: "./view-basic-school-info.component.html",
  styleUrls: ["./view-basic-school-info.component.scss"],
})
export class ViewBasicSchoolInfoComponent implements OnInit {
  @Input() schoolId: any | undefined;
  @Input() menuCodeId: any | undefined;
  @Input() completion_status: any;
  @Input() completion_percentage: any | undefined;
  @Input() formData: any;
  @Input() clarification:any;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  remarkStatus: string | undefined;
  title: string = "Contact Info";
  filteredRows: any = [];
  totalRecords: number = 0;
  schoolList: any;
  ColumnMode = ColumnMode;
  subs: Subscription[] = [];
  total: any;
  profile: any;
  row: any;
  selectedClarification:any;
  loadingIndicator = true;


  columns = [
    { name: "Name", prop: "name" },
    { name: "Category", prop: "category" },
    { name: "Gender", prop: "schoolGender" },
    { name: "Curriculum", prop: "curriculum" },
    // { name: 'postalCode', prop: 'postalCode' },
    // { name: 'postalAddress', prop: 'postalAddress' },
    // { name: 'moeRegistrationNumber', prop: 'moeRegistrationNumber' },
    // { name: 'idNumber', prop: 'idNumber' },
    { name: "MobileNumber", prop: "mobileNumber" },
    // { name: 'emailAddress', prop: 'emailAddress' },
    // { name: 'subCounty', prop: 'subCounty' },
    { name: "county", prop: "county" },
    // { name: 'diocese', prop: 'diocese' },
    // { name: 'from', prop: 'from' },
    // { name: 'to', prop: 'to' },
    // { name: 'from', prop: 'from' },
    // { name: "Status", prop: "status" },
  ];

  public form!: FormGroup;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public schoolList$: any;
  clarificationStatus: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  allColumns = [...this.columns];
  ngOnInit(): void {
    this.profile = localStorage.getItem("profile");
    this.activatedRoute.params.subscribe((params) => {
      console.log("params::");
      console.log(params);
      if (typeof params["id"] !== "undefined") {
        this.schoolId = parseInt(params["id"]);
        this.loadData(this.schoolId);
        this.getClarification() 

      }
    });
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private loadData(id: number): any {
    console.log("id");
    console.log(id);
    this.loading = true;

    let schoolList$ = this.httpService
      .getReq(`portal/api/v1/schools/view/${id}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            console.log(res);
            this.loading = false;
            this.schoolList = res.data;
          
            

          } else {
            
          }
        },
        (error: any) => {}
      );

    this.subs.push(schoolList$);
  }

  addClarification() {
    this.modalRef = this.modalService.open(PartnerActionDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = "Add Clarification";
    this.modalRef.componentInstance.buttonLabel = "Add Clarification";
    this.modalRef.result
      .then((result) => {
        if (result?.status === "success") {
          console.log(result);

          const model = {
            menuCodeId: this.menuCodeId,
            schoolId: this.schoolId,
            remarks: result?.remarks,
          };
          console.log(model,'test Menu code');
          
          this.loading = true;
          this.httpService
            .postReq("portal/api/v1/schools/submitted/raise/clarification", model)
            .subscribe({
              next: (resp) => {
                if (resp["status"] === 0) {
                  this.toastr.success(resp?.message, "Success");
                } else {
                  this.toastr.error(resp?.message, "Error");
                }
                this.loading = false;
              },
              error: (error) => {
                this.loading = false;
                this.toastr.error(error["message"] || error.error["message"]);
                this.loading = false; 

              },
            });
        }
        this.getClarification() 
      })
      .catch((error) => {
        console.log("Modal dismissed with error:", error);
      });
  }
  getClarification() {
    let model = {
      schoolId: this.schoolId,
      menuCodeId:this.menuCodeId
      
    };
    this.httpService
      .postReq("portal/api/v1/schools/submitted/clarify/getall", model)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            console.log(res);
            this.loading = false;
            if (res.data) {
              this.clarification = res.data;
              this.fetchClarificationStatus();
              console.log(this.clarification, "Clarification for all,, I am looking for remarkStatus");
            } else {
              console.log("No clarification data available.");
            }
          } else {
            this.loading = false;
            console.error("Failed to fetch clarification data:", res.message);
          }
        },
        (error: any) => {
          this.loading = false;
          console.error("Error occurred while fetching clarification data:", error);
        }
      );
  }
  



  fetchClarificationStatus(){
    this.clarificationStatus = this.clarification.filter((item: any) => item.menuCodeId == this.menuCodeId)[0].remarks;
    this.remarkStatus = this.clarification.filter((item: any) => item.menuCodeId == this.menuCodeId)[0].remarkStatus;

  }
  closeClarification() {
    this.modalRef = this.modalService.open(PartnerActionDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = "Close Clarification";
    this.modalRef.componentInstance.buttonLabel = "Close Clarification";
    this.modalRef.result
      .then((result) => {
        if (result?.status === "success") {
          console.log(result);

          const model = {
            menuCodeId: this.menuCodeId,
            schoolId: this.schoolId,
            remarks: result?.remarks,
          };
          this.loading = true;
          this.httpService
            .postReq("portal/api/v1/schools/close/replied/clarification", model)
            .subscribe({
              next: (resp) => {
                if (resp["status"] === 0) {
                  this.toastr.success(resp?.message, "Success");
                } else {
                  this.toastr.error(resp?.message, "Error");
                }
                this.loading = false; 
              },
              error: (error) => {
                this.loading = false;
                this.toastr.error(error["message"] || error.error["message"]);
                this.loading = false; },
            });
        }
      })
      .catch((error) => {
        console.log("Modal dismissed with error:", error);
      });
  }
  
}
