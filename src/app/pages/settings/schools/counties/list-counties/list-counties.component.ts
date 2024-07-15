import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import {
  Observable,
  Subscription,
  TimeoutError,
  catchError,
  map,
  of,
} from "rxjs";
import { UserActionsModalComponent } from "src/app/shared/components/user-actions-modal/user-actions-modal.component";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ViewSubcountiesbycountyComponent } from "../view-subcountiesbycounty/view-subcountiesbycounty.component";

@Component({
  selector: "app-list-counties",
  templateUrl: "./list-counties.component.html",
  styleUrls: ["./list-counties.component.scss"],
})
export class ListCountiesComponent implements OnInit {
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "Counties";
  actions = ["View Subcounties", "View Diocese", "Edit", "Delete"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  viewedCounty: any;
  
  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  columns = [
    { name: "ID", prop: "frontendId" },
    { name: "name", prop: "name" },
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  countiesList$: Observable<any> = of([]);
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData() {
    this.loading = true;
    const model = null;
    this.countiesList$ = this.httpService
      .postReq("portal/api/v1/ag-settings/counties/getall", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];
            console.log(response);

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
    this.rows = [{}];
  }

  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    console.log(eventData);

    if (eventData.action == "View Subcounties") {
      this.viewedCounty = eventData["row"]["id"];
      console.log(this.viewedCounty);

      this.router.navigate([
        `settings/counties/view-subcounties/${this.viewedCounty}`,
      ]);
    }
    if (eventData.action == "View Diocese") {
      this.viewedCounty = eventData["row"]["id"];
      console.log(this.viewedCounty);

      this.router.navigate([
        `settings/counties/view-diocese/${this.viewedCounty}`,
      ]);
    }
    if (eventData.action == "Edit") {
      this.editCounty(eventData.row);
    } else if (eventData.action == "Delete") {
      this.deleteCounty(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }
  addCounty() {
    this.modalRef = this.modalService.open(ViewSubcountiesbycountyComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add school Curriculum";
    // reload
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
  editCounty(formData: any) {
    this.modalRef = this.modalService.open(ViewSubcountiesbycountyComponent, {
      centered: true,
      animation: true,
    });

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = "Edit School Curriculum";
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

  private deleteCounty(row: any) {
    this.modalRef = this.modalService.open(UserActionsModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = `Delete School Curriculum`;
    this.modalRef.componentInstance.buttonLabel = `Delete School Curriculum`;
    this.modalRef.componentInstance.body = `Do you want to  Delete this School Curriculum?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result);
      if (result?.status === "success") {
        const model = {
          id: row.id,
          remark: result?.remark,
        };

        let suspendCounty = this.httpService
          .postReq("portal/api/v1/ag-settings/county/delete", model)
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
                  error.error["message"]
              );
            },
          });

        this.subs.push(suspendCounty);
      }
    });
  }
}
