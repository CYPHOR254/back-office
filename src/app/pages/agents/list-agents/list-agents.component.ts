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
import { AddAgentComponent } from "../add-agent/add-agent.component";
import { EditAgentComponent } from "../edit-agent/edit-agent.component";
import { UserActionsModalComponent } from "src/app/shared/components/user-actions-modal/user-actions-modal.component";
import { AssignProfileDialogComponent } from "src/app/shared/components/assign-profile-dialog/assign-profile-dialog.component";

@Component({
  selector: "app-agents",
  templateUrl: "./list-agents.component.html",
  styleUrls: ["./list-agents.component.scss"],
})
export class ListAgentsComponent implements OnInit {
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  allRecords: any;
  title: string = "schools";
  actions = ["View", "Edit", "Delete", "Activate"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  profilesList: any[] = [];
  channelOptions: any[] = [];
  viewedAgent: any;
  form: any;
  isLoading!: boolean;

  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) { }

  columns = [
    // {name: 'ID', prop: 'frontendId'},
    { name: "First Name", prop: "firstName" },
    { name: "Middle Name", prop: "middleName" },
    { name: "Last Name", prop: "lastName" },
    { name: "Phone Number", prop: "phoneNumber" },
    { name: "Email", prop: "email" },
    // {name: 'idNumber', prop: 'idNumber'},
    // {name: 'CreatedOn', prop: 'createOn'},
    // {name: 'CreatedBy', prop: 'createBy'},
    { name: "Actions", prop: "actions" },
  ];

  allColumns = [...this.columns];
  agentsList$: Observable<any> =of ([]);

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData() {
    this.loading = true;
    const model = null;
    this.agentsList$ = this.httpService
      .postReq("portal/api/v1/agents/getall", model)
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
    this.viewedAgent = eventData["row"]["id"];

    if (eventData.action == "View") {
      this.router.navigate([`/agents/view-agent/${this.viewedAgent}`]);
    } else if (eventData.action == "Activate") {
      this.activateAgent(eventData.row);
    } else if (eventData.action == "Edit") {
      this.editAgent(eventData.row);
    } else if (eventData.action == "Delete") {
      this.disableAgent(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }
  addSchool() {
    this.modalRef = this.modalService.open(AddAgentComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add Agent";
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
  editAgent(formData: any) {
    this.modalRef = this.modalService.open(EditAgentComponent, {
      centered: true,
      animation: true,
    });

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = "Edit Agent";
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

  activateAgent(row: any) {
    this.modalRef = this.modalService.open(AssignProfileDialogComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = `Activate Agent`;
    this.modalRef.componentInstance.buttonLabel = `Activate Agent`;
    this.modalRef.componentInstance.formData = row;
    this.modalRef.componentInstance.body = `Do you want to  active this Agent?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result.status, "here is the result");
      if (result?.status === "success") {
        this.isLoading = true;

        let model = {
          agentId: row.id,
          profileId: result?.profileId,
          channel: "APP",
        };

        this.httpService
          .postReq("portal/api/v1/systemuser/make/agent/systemuser", model)
          .subscribe((result: any) => {
            if (result.status === 0) {
              this.toastr.success("Agent activation successfully", "Success");
              console.log("result");
            } else {
              this.toastr.error(result?.message, "Error");
            }
          });
      }
    });
  }

  private disableAgent(row: any) {
    this.modalRef = this.modalService.open(UserActionsModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = `Delete Agent`;
    this.modalRef.componentInstance.buttonLabel = `Delete Agent`;
    this.modalRef.componentInstance.body = `Do you want to  Delete this Agent?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result);
      if (result?.status === "success") {
        const model = {
          id: row.id,
          remark: result?.remark,
        };

        let suspendAgent = this.httpService
          .postReq("portal/api/v1/agents/delete", model)
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
                "Agent not suspended."
              );
            },
          });

        this.subs.push(suspendAgent);
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

    this.agentsList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
      );
    });
    this.agentsList$ = of(filteredData);
  }
}
