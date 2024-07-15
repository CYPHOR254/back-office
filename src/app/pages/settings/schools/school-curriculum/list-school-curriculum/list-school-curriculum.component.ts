import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import {
  catchError,
  map,
  Observable,
  observable,
  of,
  Subscription,
  throwError,
  TimeoutError,
} from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { UserActionsModalComponent } from "src/app/shared/components/user-actions-modal/user-actions-modal.component";
import { AddSchoolCurriculumComponent } from "../add-school-curriculum/add-school-curriculum.component";
import { EditSchoolCurriculumComponent } from "../edit-school-curriculum/edit-school-curriculum.component";

@Component({
  selector: "app-list-school-curriculum",
  templateUrl: "./list-school-curriculum.component.html",
  styleUrls: ["./list-school-curriculum.component.scss"],
})
export class ListSchoolCurriculumComponent implements OnInit {
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "School Curriculum";
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
  schoolCurriculumList$: Observable<any> = of([]);
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData() {
    this.loading = true;
    const model = null;
    this.schoolCurriculumList$ = this.httpService
      .postReq("portal/api/v1/ag-settings/curriculum/getall", model)
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
      this.editSchoolCurriculum(eventData.row);
    } else if (eventData.action == "Delete") {
      this.deleteSchoolCurriculum(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }
  addSchoolCurriculum() {
    this.modalRef = this.modalService.open(AddSchoolCurriculumComponent, {
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
  editSchoolCurriculum(formData: any) {
    this.modalRef = this.modalService.open(EditSchoolCurriculumComponent, {
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

  private deleteSchoolCurriculum(row: any) {
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

        let suspendAgent = this.httpService
          .postReq("portal/api/v1/ag-settings/curriculum/delete", model)
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

        this.subs.push(suspendAgent);
      }
    });
  }
}
