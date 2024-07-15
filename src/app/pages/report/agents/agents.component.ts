import { Component, Input, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
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

@Component({
  selector: "app-agents",
  templateUrl: "./agents.component.html",
  styleUrls: ["./agents.component.scss"],
})
export class AgentsComponent implements OnInit {
  @Input() formData: any;

  allRecords: any;
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "Agents";
  actions = ["View", "Edit", "Delete", "Activate"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  profilesList: any[] = [];
  channelOptions: any[] = [];
  agentsList$: Observable<any> = of([]);
  viewedAgent: any;

  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService
  ) {}

  columns = [
    // {name: 'ID', prop: 'frontendId'},
    { name: "First Name", prop: "firstName" },
    { name: "Middle Name", prop: "middleName" },
    { name: "Last Name", prop: "lastName" },
    { name: "idNumber", prop: "idNumber" },
    // {name: 'CreatedBy', prop: 'createdBy'},
  ];

  allColumns = [...this.columns];

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
            this.allRecords = resp["data"];

            this.rows = response.map((item: any, index: any) => {
              const myDate = item["createdOn"]?.split(" ")[0];
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
  }
  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
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
