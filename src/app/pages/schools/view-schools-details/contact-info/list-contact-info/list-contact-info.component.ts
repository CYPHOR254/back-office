import { Component, Input, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, of, Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { PartnerActionDialogComponent } from "src/app/shared/components/partner-action-dialog/partner-action-dialog.component";

@Component({
  selector: "app-list-contact-info",
  templateUrl: "./list-contact-info.component.html",
  styleUrls: ["./list-contact-info.component.scss"],
})
export class ListContactInfoComponent implements OnInit {
  @Input() schoolId: any | undefined;
  @Input() menuCodeId: any | undefined;
  @Input() completion_status: any;
  @Input() completion_percentage: any | undefined;
  @Input() formData: any;
  @Input() clarification: any;

  loading: boolean = true;
  contactsList: any[] = [];
  clarificationStatus: any;
  remarkStatus: string | undefined;
  profile: any;

  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService,
    private router: Router,
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.profile = localStorage.getItem("profile");

    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.schoolId = params["id"];
        console.log(this.schoolId, "school id for school contact");
        this.loadData();
      }
      this.getClarification();
      console.log("this page has loaded");
    });
  }

  loadData(): void {
    const model = {
      id: this.schoolId,
      page: 0,
      size: 100,
    };

    this.httpService
      .postReq("portal/api/v1/schools/contacts/getall/forschool", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];
            console.log(response);
            this.contactsList = response;
            this.loading = false;
          } else {
            this.toastr.error("Unable to fetch contacts", "Error");
            this.loading = false;
          }
        })
      )
      .subscribe();
  }

  loadContactDetails(contactId: number): void {
    console.log("Loading contact details for contactId:", contactId);
    this.loading = true;

    this.httpService
      .getReq(`portal/api/v1/schools/contacts/view/${contactId}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            console.log(res);
            this.contactsList.find(contact => contact.id === contactId).details = res.data;
            this.loading = false;
          } else {
            this.toastr.error("Failed to fetch contact details", "Error");
            this.loading = false;
          }
        },
        (error: any) => {
          this.toastr.error("Error occurred while fetching contact details", "Error");
          this.loading = false;
        }
      );
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
      })
      .catch((error) => {
        console.log("Modal dismissed with error:", error);
      });
  }

  downloadDocument(documentUrl: string) {
    const link = document.createElement('a');
    link.href = documentUrl;
    link.download = documentUrl.substring(documentUrl.lastIndexOf('/') + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  getClarification() {
    let model = {
      schoolId: this.schoolId,
      menuCodeId: this.menuCodeId
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
              console.log(this.clarification, "Clarification for all");
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

  fetchClarificationStatus() {
    this.clarificationStatus = this.clarification.filter((item: any) => item.menuCodeId == this.menuCodeId)[0].remarks;
    this.remarkStatus = this.clarification.filter((item: any) => item.menuCodeId == this.menuCodeId)[0].remarkStatus;
    console.log(this.remarkStatus, "Clarification for all");
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
                this.loading = false; 
              },
            });
        }
      })
      .catch((error) => {
        console.log("Modal dismissed with error:", error);
      });
  }

}
