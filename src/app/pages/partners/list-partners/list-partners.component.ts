import { Component, Input, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  TimeoutError,
} from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { UserActionsModalComponent } from "src/app/shared/components/user-actions-modal/user-actions-modal.component";
import { AssignProfileDialogComponent } from "src/app/shared/components/assign-profile-dialog/assign-profile-dialog.component";
import { EditPartnerComponent } from "../edit-partner/edit-partner.component";
import { AddPartnerComponent } from "../add-partner/add-partner.component";
@Component({
  selector: "app-list-partners",
  templateUrl: "./list-partners.component.html",
  styleUrls: ["./list-partners.component.scss"],
})
export class ListPartnersComponent implements OnInit {
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  allRecords: any;
  title: string = "Partners";
  actions = ["View", "Edit", "Delete", "Activate"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  profilesList: any[] = [];
  channelOptions: any[] = [];
  viewedPartner: any;
  form: any;
  isLoading!: boolean;

  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {}

  columns = [
    // {name: 'ID', prop: 'frontendId'},
    { name: "First Name", prop: "firstName" },
    { name: "Middle Name", prop: "middleName" },
    { name: "Last Name", prop: "lastName" },
    { name: "Phone Number", prop: "phoneNumber" },
    { name: "Email", prop: "email" },

    // {name: 'idNumber', prop: 'idNumber'},
    // { name: "CreatedOn", prop: "createOn" },
    // {name: 'CreatedBy', prop: 'createBy'},
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  partnersList$: Observable<any> = of([]);

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData() {
    this.loading = true;
    const model = null;
    this.partnersList$ = this.httpService
      .postReq("portal/api/v1/partners/getall", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];
            console.log(response);
            this.allRecords = resp["data"];

            this.rows = response.map((item: any, index: any) => {
              const res = {
                ...item,
                frontendId: index + 1,
              };
              return res;
            });
            this.rows = this.rows.filter((row: any) => row !== undefined);
            this.totalRecords = this.rows.length;
            this.loading = false;
            return this.rows;
          } else {
            this.loading = false;
            return of([]);
          }
        }),
        catchError((error: any) => {
          this.loading = false;
          if (error instanceof TimeoutError) {
            this.toastr.error(error["message"], "API Timeout");
          } else {
            this.toastr.error(
              error["statusText"] || error["message"],
              "Data Not Fetched"
            );
          }
          return of([]);
        })
      );
  }
  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    this.viewedPartner = eventData["row"]["id"];

    if (eventData.action == "View") {
      this.router.navigate([`/partners/view-partner/${this.viewedPartner}`]);
    } else if (eventData.action == "Activate") {
      this.activatePartner(eventData.row);
    } else if (eventData.action == "Edit") {
      this.editPartner(eventData.row);
    } else if (eventData.action == "Delete") {
      this.disablePartner(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }
  addPartner() {
    this.modalRef = this.modalService.open(AddPartnerComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add Partner";
    this.modalRef.result.then(
      (result) => {
        if (result === "success") {
          this.getIndividualData();
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }
  editPartner(formData: any) {
    this.modalRef = this.modalService.open(EditPartnerComponent, {
      centered: true,
      animation: true,
    });

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = "Edit Partner";
    this.modalRef.result.then(
      (result) => {
        if (result === "success") {
          this.getIndividualData();
        }
      },
      (reason) => {
        console.log(reason);
      }
    );
  }

  private activatePartner(row: any) {
    this.modalRef = this.modalService.open(AssignProfileDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = `Activate Partner`;
    this.modalRef.componentInstance.buttonLabel = `Activate Partner`;
    this.modalRef.componentInstance.body = `Do you want to  active this Partner?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result);
      if (result?.status === "success") {
        this.isLoading = true;

        let model = {
          partnerId: row.id,
          profileId: result?.profileId,
          channel: "PORTAL",
        };

        this.httpService
          .postReq("portal/api/v1/systemuser/make/partner/systemuser", model)
          .subscribe((result: any) => {
            if (result.status === 0) {
              this.toastr.success(result?.message, "Success");
              console.log("result");
            } else {
              this.toastr.error(result?.message, "Error");
            }
          });
      }
    });
  }

  private disablePartner(row: any) {
    this.modalRef = this.modalService.open(UserActionsModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = `Delete Partner`;
    this.modalRef.componentInstance.buttonLabel = `Delete Partner`;
    this.modalRef.componentInstance.body = `Do you want to  Delete this Partner?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result);
      if (result?.status === "success") {
        const model = {
          id: row.id,
          remark: result?.remark,
        };

        this.httpService
          .postReq("portal/api/v1/partners/delete", model)
          .subscribe({
            next: (resp) => {
              if (resp["status"] === 0) {
                this.toastr.success(resp?.message, "Sucsess");
                this.getIndividualData();
              } else {
                this.toastr.error(resp?.message, "Error");
              }
            },
            error: (error) => {
              this.loading = false;
              this.toastr.error(
                error["statusText"] ||
                  error["message"] ||
                  error.error["message"],
                "Partner not suspended."
              );
            },
          });
      }
    });
  }

  searchResultUniversal(event: any) {
    const filteredData = this.allRecords?.filter((item: any) => {
      return Object.values(item)?.some((value: any) => {
        let str = value + "";
        return str?.toLowerCase()?.includes(event?.toLowerCase());
      });
    });

    this.partnersList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
      );
    });
    this.partnersList$ = of(filteredData);
  }
}
