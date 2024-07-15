import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ToastrService } from "ngx-toastr";
import { PartnerActionDialogComponent } from "src/app/shared/components/partner-action-dialog/partner-action-dialog.component";

@Component({
  selector: "app-view-schools-details",
  templateUrl: "./view-schools-details.component.html",
  styleUrls: ["./view-schools-details.component.scss"],
})
export class ViewSchoolsDetailsComponent implements OnInit, OnDestroy {
  activeId = 0;
  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading: boolean | undefined
  reorderable = true;
  title: string = "Schools by agent";
  actions = ["Viewagent"];
  filteredRows: any = [];
  totalRecords: number = 0;
  menuOutline: any[] = [];
  schoolDetails: any;
  menuDetails: any[] = [];
  profile: any;
  subs: Subscription[] = [];
  total: any;
  activeTab: number | undefined;
  row: any;
  ColumnMode = ColumnMode;
  schoolLogoUrl: string | undefined;
  defaultLogoUrl: string = '/assets/img/blue_school_logo-removebg.png'; 
  clarification: any;
  selectedClarification: any;



  @Input() formData: any;
  public form!: FormGroup;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public schoolId!: number;
  public menuCodeId!: number;

  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    public httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  columns = [
    { name: "ID", prop: "frontendId" },
    { name: "firstName", prop: "firstName" },
    { name: "middleName", prop: "middleName" },
    { name: "lastName", prop: "lastName" },
    { name: "phoneNumber", prop: "phoneNumber" },
    { name: "idNumber", prop: "idNumber" },
    { name: "createdBy", prop: "createdBy" },
    { name: "Actions", prop: "actions" },
  ];

  ngOnInit(): void {
    this.getMenuOutline();
    this.profile = localStorage.getItem("profile");
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.schoolId = params["id"];
        console.log(this.schoolId, "school id for school details");
        this.getSchoolDetails();
      }
    });
  }

  getMenuStatus(menuCodeId: number) {
    let model = {
      schoolId: this.schoolId,
      menuCodeId: menuCodeId,
    };
    console.log(menuCodeId);

        return this.httpService
      .postReq("portal/api/v1/menu-codes/statuses/getall", model)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            console.log(res);
            this.loading = false;
            this.menuDetails = res.data;
            console.log(this.menuDetails,'Testing');
            
          } else {
            this.loading = false;
          }
        },
        (error: any) => {
          this.loading = false;
        }
      );
  }



  getStatus(name: string, ): any {
    let menuStatus = this.menuDetails.find((item: any) => {
      return item?.menuCode == name
    });
    return menuStatus?.status || "UNKNOWN" 
  }

  getPercentage(name: string, ): any {
    let menuStatus = this.menuDetails.find((item: any) => {
      return item?.menuCode == name
    });
    return menuStatus?.completionPercentage 
  }


  getSchoolDetails() {
    return this.httpService
      .getReq(`portal/api/v1/schools/view/${this.schoolId}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            this.loading = false;
            this.schoolDetails = res.data;
            this.getMenuStatus(this.schoolDetails?.menuCodeId);

          } else {
            this.loading = false;
          }
        },
        (error: any) => {
          this.loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  getMenuOutline() {
    this.loading = true;
    const model = null;
    this.httpService
      .postReq("portal/api/v1/documents/menu-codes/getall", model)
      .subscribe((response: any) => {
        if (response.status == 0) {
          this.menuOutline = response.data.sort(
            (a: any, b: any) => a.id - b.id);
        }
        console.log(this.menuOutline, 'MenuOutline');
        
      });
  }
  approveSchool(row: any) {
    this.modalRef = this.modalService.open(PartnerActionDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = "Approve School";
    this.modalRef.componentInstance.buttonLabel = "Approve School";
    this.modalRef.componentInstance.body = "Do you want to Approve this School?";
    this.modalRef.componentInstance.formData = row;
  
    this.modalRef.result
      .then((result) => {
        if (result?.status === "success") {
          const model = {
            schoolId: this.schoolId,
            remarks: result?.remarks,
          };
          this.loading = true; // Show loader
          this.httpService.postReq("portal/api/v1/schools/submitted/approve", model)
            .subscribe({
              next: (resp) => {
                if (resp["status"] === 0) {
                  this.toastr.success(resp?.message, "Success");
                  this.getSchoolDetails();
                  this.getMenuStatus(this.schoolDetails?.menuCodeId);
                } else {
                  this.toastr.error(resp?.message, "Error");
                }
                this.loading = false; // Hide loader after API call completes
              },
              error: (error) => {
                this.toastr.error(error.statusText || error.message || error.error.message, "School not approved.");
                this.loading = false; // Hide loader on error
              },
            });
        }
      })
      .catch((error) => {
        console.log("Modal dismissed with error:", error);
      });
  }
  
  rejectSchool(row: any) {
    this.modalRef = this.modalService.open(PartnerActionDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = "Reject School";
    this.modalRef.componentInstance.buttonLabel = "Reject School";
    this.modalRef.componentInstance.body = "Do you want to reject this School?";
    this.modalRef.componentInstance.formData = row;
  
    this.modalRef.result
      .then((result) => {
        if (result?.status === "success") {
          const model = {
            schoolId: this.schoolId,
            remarks: result?.remarks,
          };
          this.loading = true; // Show loader
          this.httpService.postReq("portal/api/v1/schools/submitted/reject", model)
            .subscribe({
              next: (resp) => {
                if (resp["status"] === 0) {
                  this.toastr.success(resp?.message, "Success");
                  this.getSchoolDetails();
                  this.getMenuStatus(this.schoolDetails?.menuCodeId);
                } else {
                  this.toastr.error(resp?.message, "Error");
                }
                this.loading = false; // Hide loader after API call completes
              },
              error: (error) => {
                this.toastr.error(error.statusText || error.message || error.error.message, "School not rejected.");
                this.loading = false; // Hide loader on error
              },
            });
        }
      })
      .catch((error) => {
        console.log("Modal dismissed with error:", error);
      });
  }
  getStatusBackgroundColor(status: string): string {
    switch (status) {
      case "PENDING":
        return "#BE9650";
      case "APPROVED":
        return "#679800";
      case "SUBMITTED":
        return "#25AAE2";
      case "CLARIFICATION":
        return "#4154F1";
      case "REJECTED":
        return "#D6202C";

      default:
        return "#ffffff";
    }
  }


}
