import { Component, Input, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
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
  selector: "app-agent-login-history",
  templateUrl: "./agent-login-history.component.html",
  styleUrls: ["./agent-login-history.component.scss"],
})
export class AgentLoginHistoryComponent implements OnInit {
  @Input() agentId: any | undefined;
  
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  allRecords: any;

  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}
  columns = [
    { name: "User", prop: "user" },
    { name: "Host", prop: "host" },
    { name: "Ip Adress", prop: "ip" },
    { name: "Channel", prop: "channel" },
    { name: "User Agent", prop: "userAgent" },
    { name: "CreatedOn", prop: "createdOn" },
  ];

  allColumns = [...this.columns];
  OwnLoginHistoryList$: Observable<any> = of([]);
  title: string = "User";
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  viewedHistory: any;

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.agentId = params["id"];
        this.getIndividualData();
      }
      console.log(this.agentId);
      
    });
  }

  getIndividualData(page: number = 0, size: number = 50): void {
    this.loading = true;
    const model = {
      page: page,
      id: this.agentId,
      size: size,
    };

    this.OwnLoginHistoryList$ = this.httpService
      .postReq("portal/api/v1/audit/login/history/getall/own", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            this.allRecords = resp["data"];
            let response = resp["data"];
            console.log(response, "for login");

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
  }
  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);

    if (eventData.action == "View") {
      this.viewedHistory = eventData["row"]["id"];
      this.router.navigate([
        `/audit-trail/own-login-history/${this.viewedHistory}`,
      ]);
    }
  }
  searchResultUniversal(event: any) {
    const filteredData = this.allRecords?.filter((item: any) => {
      return Object.values(item)?.some((value: any) => {
        let str = value + "";
        return str?.toLowerCase()?.includes(event?.toLowerCase());
      });
    });

    this.OwnLoginHistoryList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
      );
    });

    this.OwnLoginHistoryList$ = of(filteredData);
  }
}
