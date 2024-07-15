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
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-list-diocese",
  templateUrl: "./list-diocese.component.html",
  styleUrls: ["./list-diocese.component.scss"],
})
export class ListDioceseComponent implements OnInit {
  public modalRef!: NgbModalRef;
  @Input() formData: any;
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "Diocese";
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  viewedCounty: any;

  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService
  ) {}

  columns = [
    // {name: 'ID', prop: 'id'},
    { name: "Name", prop: "name" },
    // {name: 'County', prop: 'county'},
    // {name: 'Actions', prop: 'actions' },
  ];

  allColumns = [...this.columns];
  dioceseList$: Observable<any> = of([]);
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData() {
    this.loading = true;
    const model = null;
    this.dioceseList$ = this.httpService
      .postReq("portal/api/v1/ag-settings/diocese/getall", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];
            // console.log(response);

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
}
