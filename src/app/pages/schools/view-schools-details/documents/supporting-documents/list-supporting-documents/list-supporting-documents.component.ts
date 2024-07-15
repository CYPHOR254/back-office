import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable, Subscription,of } from "rxjs";
import { PartnerActionDialogComponent } from "src/app/shared/components/partner-action-dialog/partner-action-dialog.component";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-list-supporting-documents",
  templateUrl: "./list-supporting-documents.component.html",
  styleUrls: ["./list-supporting-documents.component.scss"],
})
export class ListSupportingDocumentsComponent implements OnInit {

  @Input() schoolId: any | undefined;
  @Input() menuCodeId: any | undefined;
  @Input() formData: any;
  @Input() completion_status: any;
  @Input() completion_percentage: any | undefined;
  @Input() clarification:any;
  remarkStatus: string | undefined;

  loading: boolean = true;
  rows: any = [];
  row: any;
  activeId = 0;
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "Contact Info";
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  documentsList: any[] = [];
  channelOptions: any[] = [];
  viewedDocument: any;
  documentsList$: Observable<any> = of([]);
  documentType: any[] = [];
  documentDetails: any;
  defaultImage: string = "assets/img/file_icon.png";
  allRecords: any;
  profile: any;
  clarificationStatus:any;

  [x: string]: any;

  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public http: HttpClient,
    public fb: FormBuilder,
    public modalService: NgbModal,
    public toastr: ToastrService,
  ) {}

  columns = [
    { name: "Name", prop: "name" },
    { name: "Menu Code", prop: "menuCode" },
    { name: "DocumentType", prop: "documentType" },
    { name: "Description", prop: "description" },
    { name: "school", prop: "school" },
    // { name: "schoolId", prop: "schoolId" },
    // { name: "createdOn", prop: "createdOn" },
    { name: "Actions", prop: "actions" },
  ];

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {

    console.log('Completion details.');
    
    console.log(this.completion_status);
    console.log(this.completion_percentage);
    this.profile = localStorage.getItem("profile");
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.schoolId = params["id"];
        console.log(this.schoolId, "school id for directors");
      }
      console.log("this page has loaded");
    });
    this.loadAllDocumentType();
    this.getClarification() 
  }

  loadAllDocumentType() {
    this.loading = true;
        const model = {
          schoolId: this.schoolId, 
          pages:0,
          size:100
        };
      this.httpService
        .postReq("portal/api/v1/documents/supporting/getall/details", model)
        .subscribe((response: any) => {
          if (response?.status == 0 ) {
            this.documentType = response?.data;
            console.log(this.documentType ,'for the support')
            this.loadDocumentData(this.documentType[0].id)

          }
        });
    }
  loadDocumentData(id:number): any {
      console.log("Called Function...");
  
      this.loading = true;
  
      const model = {
        supportId: id,
        schoolId: this.schoolId, 
        page: 0,
        size: 100,
      };
  
      return this.httpService
        .postReq("portal/api/v1/documents/supporting/getall/bysupportid", model)
        .subscribe(
          (res: any) => {
            if (res.status === 0) {
              this.loading = false;
              this.documentDetails = res.data;
              console.log(this.documentDetails,'This is where i should see the percentage')
              } else {
            }
          },
          (error: any) => {}
        );
    }

  // openInNewPage(urlString: string) {
  //   console.log("urlString");
  //   console.log(urlString);

  //   this.http.get(urlString, { responseType: "blob" }).subscribe(
  //     (response: Blob) => {
  //       // handle the document, for example, create a URL to download it
  //       const url = window.URL.createObjectURL(response);

  //       window.open(url, "_blank");
  //     },
  //     (error) => {
  //       console.error("Error fetching the document:", error);
  //     }
  //   );
  // }

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
    switch (extension.toLowerCase()) {
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
  triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    this.viewedDocument = eventData["row"]["id"];

    if (eventData.action == "View") {
      this.router.navigate([
        `/schools/view-supporting-documents/${this.viewedDocument}`,
      ]);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  searchResultUniversal(event: any) {
    const filteredData = this.allRecords?.filter((item: any) => {
      return Object.values(item)?.some((value: any) => {
        let str = value + "";
        return str?.toLowerCase()?.includes(event?.toLowerCase());
      });
    });

    this.documentsList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
      );
    });
    this.documentsList$ = of(filteredData);
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
              this.remarkStatus = this.clarification.remarkStatus; // Set the remarkStatus

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
