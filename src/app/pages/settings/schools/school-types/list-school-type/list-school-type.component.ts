import { Component, Input, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
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
import { AddSchoolTypeComponent } from "../add-school-type/add-school-type.component";
import { EditSchoolTypeComponent } from "../edit-school-type/edit-school-type.component";

@Component({
  selector: "app-list-school-type",
  templateUrl: "./list-school-type.component.html",
  styleUrls: ["./list-school-type.component.scss"],
})
export class ListSchoolTypeComponent implements OnInit {
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "School Type";
  actions = ["Edit", "Delete"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  profilesList: any[] = [];
  channelOptions: any[] = [];
  viewedAgent: any;

  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  columns = [
    { name: "Name", prop: "name" },
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  schoolTypeList$: Observable<any> = of([]);
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData() {
    this.loading = true;
    const model = null;
    this.schoolTypeList$ = this.httpService
      .postReq("portal/api/v1/ag-settings/schooltype/getall", model)
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
  }
  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);

    if (eventData.action == "Edit") {
      this.editSchoolType(eventData.row);
    } else if (eventData.action == "Delete") {
      this.deleteSchoolType(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }
  addSchoolType() {
    this.modalRef = this.modalService.open(AddSchoolTypeComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add school Type";
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
  editSchoolType(formData: any) {
    this.modalRef = this.modalService.open(EditSchoolTypeComponent, {
      centered: true,
      animation: true,
    });

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = "Edit School Type";
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

  private deleteSchoolType(row: any) {
    this.modalRef = this.modalService.open(UserActionsModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = `Delete School Type`;
    this.modalRef.componentInstance.buttonLabel = `Delete School Type`;
    this.modalRef.componentInstance.body = `Do you want to  Delete this School Type?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result);
      if (result?.status === "success") {
        const model = {
          id: row.id,
          remark: result?.remark,
        };

        let suspendAgent = this.httpService
          .postReq("portal/api/v1/ag-settings/Type/delete", model)
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
              // Handle the error here
              this.loading = false;
              this.toastr.error(
                error["statusText"] ||
                  error["message"] ||
                  error.error["message"]
              );
            },
          });

        this.subs.push(suspendAgent);
      }
    });
  }
}
