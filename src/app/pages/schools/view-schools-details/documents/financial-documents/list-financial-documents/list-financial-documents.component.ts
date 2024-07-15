import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription, map, of } from "rxjs";
import { PartnerActionDialogComponent } from "src/app/shared/components/partner-action-dialog/partner-action-dialog.component";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ImageService } from "src/app/shared/services/image-service";

@Component({
  selector: "app-list-financial-documents",
  templateUrl: "./list-financial-documents.component.html",
  styleUrls: ["./list-financial-documents.component.scss"],
})
export class ListFinancialDocumentsComponent implements OnInit {
  @Input() schoolId: any | undefined;
  @Input() menuCodeId: any;
  @Input() completion_status: any;
  @Input() completion_percentage: any | undefined;
  @Input()clarification:any;
  remarkStatus: string | undefined;
  approvalForm!: FormGroup;
  rows: any = [];
  loadingIndicator = true;
  subs: Subscription[] = [];
  activeId = 0;
  modalRef!: NgbModalRef;
  documentType: any[] = [];
  loading!: boolean;
  documentDetails: any;
  isAsideNavCollapsed: any;
  actions = ["View"];
  approvalSteps: any;
  defaultImage: string = "assets/img/file_icon.png";
  documentConfig: any;
  DocumentCodeList$: Observable<any> = of([]);
  profile: any;
  row: any;
  selectedClarification:any;
  public mainProduct: any;
  clarificationStatus: any;

  constructor(
    private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public modalService: NgbModal,
    public toastr: ToastrService,
    private imageService: ImageService
  ) {}
  ngOnInit(): void {
    this.profile = localStorage.getItem("profile");
    this.activatedRoute.params.subscribe((params) => {
      console.log("params::");
      console.log(params);
      if (typeof params["id"] !== "undefined") {
        this.schoolId = params["id"];
      }
    });

    this.loadAllDocumentType();
    this.getClarification() 
  }

  loadAllDocumentType() {
    this.loading = true;
    const model = {
      menuCodeId: this.menuCodeId,
      pages: 0,
      size: 100,
    };
    this.httpService
      .postReq("portal/api/v1/documents/type/getall/by/menucode/id", model)
      .subscribe((response: any) => {
        if (response.status == 0) {
          this.documentType = response.data;
        }
        this.loadDocumentData(this.documentType[0].id)
        
      });
 
  }

  loadDocumentData(id: number): any {
    this.loading = true;
    const model = {
      documentTypeId: id,
      schoolId: this.schoolId,
      page: 0,
      size: 100,
    };
    this.httpService.postReq("portal/api/v1/documents/getall/bydoctypes", model)
    .subscribe(
      (res: any) => {
        this.loading = false;
        if (res.status === 0) {
          this.documentDetails = res.data;
          
        }
      },
      (error: any) => {
        this.loading = false;
        console.error("Error fetching documents:", error);
      }
    );
}
openDocumentInNewPage(docUrl: string): void {
  this.http.get(docUrl, { responseType: "blob" }).subscribe(
    (response: Blob) => {
      const extension = docUrl.split(".").pop() || '';
      const mimeType = this.getMimeType(extension);
      const blob = new Blob([response], { type: mimeType });
      const url = window.URL.createObjectURL(blob);

      const newWindow = window.open(url, "_blank");
      newWindow?.addEventListener("beforeunload", () => {
        window.URL.revokeObjectURL(url);
      });
    },
    (error) => {
      this.toastr.error("Error fetching the document.", "Error");
      console.error("Error fetching the document:", error);
    }
  );
}

private getMimeType(extension: string): string {
  switch (extension?.toLowerCase()) {
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}
isPDF(url: string): boolean {
  return url.toLowerCase().endsWith('.pdf');
}
  // openInNewPage(urlString: string): void {
  //   this.http.get(urlString, { responseType: "blob" }).subscribe(
  //     (response: Blob) => {
  //       const url = window.URL.createObjectURL(response);
  //       window.open(url, "_blank");
  //     },
  //     (error) => {
  //       console.error("Error fetching the document:", error);
  //     }
  //   );
  // }
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
          
          this.httpService
            .postReq("portal/api/v1/schools/close/replied/clarification", model)
            .subscribe({
              next: (resp) => {
                if (resp["status"] === 0) {
                  this.toastr.success(resp?.message, "Success");
                } else {
                  this.toastr.error(resp?.message, "Error");
                }
              },
              error: (error) => {
                this.loading = false;
                this.toastr.error(error["message"] || error.error["message"]);
              },
            });
        }
      })
      .catch((error) => {
        console.log("Modal dismissed with error:", error);
      });
  }
}
