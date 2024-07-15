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
import { EditDocumentTypesCategoriesComponent } from "../edit-document-types-categories/edit-document-types-categories.component";
import { AddDocumentTypesCategoriesComponent } from "../add-document-types-categories/add-document-types-categories.component";

@Component({
  selector: "app-list-document-types-categories",
  templateUrl: "./list-document-types-categories.component.html",
  styleUrls: ["./list-document-types-categories.component.scss"],
})
export class ListDocumentTypesCategoriesComponent implements OnInit {
  public modalRef!: NgbModalRef;
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "Document Category";
  actions = ["Edit"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  profilesList: any[] = [];
  channelOptions: any[] = [];
  viewedAgent: any;

  constructor(
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  columns = [
    { name: "Name", prop: "name" },
    { name: "Menu Code Id", prop: "menuCodeId" },
    { name: "Remarks", prop: "remarks" },
    { name: "Required", prop: "required" },
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  schoolDocumentTypesCategoriesList$: Observable<any> = of([]);
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData() {
    this.loading = true;
    const model = null;
    this.schoolDocumentTypesCategoriesList$ = this.httpService
      .postReq("portal/api/v1/documents/type/getall", model)
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
      this.editSchoolDocumentTypesCategories(eventData.row);
    } else if (eventData.action == "Delete") {
      this.deleteSchoolDocumentTypesCategories(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }
  addSchoolDocumentTypesCategories() {
    this.modalRef = this.modalService.open(
      AddDocumentTypesCategoriesComponent,
      {
        centered: true,
        animation: true,
      }
    );
    this.modalRef.componentInstance.title =
      "Add school DocumentTypesCategories";
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
  editSchoolDocumentTypesCategories(formData: any) {
    this.modalRef = this.modalService.open(
      EditDocumentTypesCategoriesComponent,
      {
        centered: true,
        animation: true,
      }
    );

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title =
      "Edit School DocumentTypesCategories";
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

  private deleteSchoolDocumentTypesCategories(row: any) {
    this.modalRef = this.modalService.open(UserActionsModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = `Delete School DocumentTypesCategories`;
    this.modalRef.componentInstance.buttonLabel = `Delete School DocumentTypesCategories`;
    this.modalRef.componentInstance.body = `Do you want to  Delete this School DocumentTypesCategories?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result);
      if (result?.status === "success") {
        const model = {
          id: row.id,
          remark: result?.remark,
        };

        let suspendAgent = this.httpService
          .postReq(
            "portal/api/v1/ag-settings/DocumentTypesCategories/delete",
            model
          )
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
