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
import { HttpServService } from "../../../../shared/services/http-serv.service";
import { ToastrService } from "ngx-toastr";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";
import { EditRoleComponent } from "../edit-role/edit-role.component";

@Component({
  selector: "app-roles",
  templateUrl: "./list-roles.component.html",
  styleUrls: ["./list-roles.component.scss"],
})
export class ListRolesComponent implements OnInit {
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  rolesList$: Observable<any> = of([]);
  title: string = "Role";
  actions = ["View", "Edit", "Delete"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  viewedRole: any;

  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {}

  columns = [
    { name: "ID", prop: "frontendId" },
    { name: "Name", prop: "name" },
    { name: "Remarks", prop: "remarks" },
    { name: "Role Type", prop: "systemRole" },
    { name: "Created On", prop: "createdOn" },
    // { name: 'Last Update', prop: 'updatedOn' },
    // { name: 'Is Active', prop: 'isActive' },
    // { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData(page: number = 0, size: number = 500): void {
    this.loading = true;

    const model = {
      filter: "all",
      page: page,
      size: size,
    };

    this.rolesList$ = this.httpService
      .postReq("portal/api/v1/roles/getall", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];

            this.rows = response.map((item: any, index: any) => {
              const myDate = item["createdOn"].split(" ")[0];
              let dateObj = new Date(myDate).toString().split("GMT")[0];
              dateObj = dateObj.replace(" 03:00:00", "");

              const res = {
                ...item,
                frontendId: index + 1,
                createdOn: dateObj,
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

    if (eventData.action == "View") {
      this.viewedRole = eventData["row"]["id"];
      this.router.navigate([`/portal/api/v1/rbac/role/${this.viewedRole}`]);
    } else if (eventData.action == "Edit") {
      this.editRole(eventData.row);
    } else if (eventData.action == "Delete") {
      this.deleteRole(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  editRole(formData: any) {
    this.modalRef = this.modalService.open(EditRoleComponent, {
      centered: true,
      animation: true,
    });

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = "Edit Role";
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

  deleteRole(roleData: any) {
    this.modalRef = this.modalService.open(ConfirmDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = "Delete Role";
    this.modalRef.componentInstance.body = "Do you want to delete this role?";
    this.modalRef.result.then((result) => {
      if (result === "success") {
        const model = {
          id: roleData.id,
        };
        this.httpService
          .postReq("portal/api/v1/roles/delete", model)
          .subscribe((result: any) => {
            if (result.status === 0) {
              this.getIndividualData();
            } else {
            }
          });
      }
    });
  }
}
