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
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-admins",
  templateUrl: "./admins.component.html",
  styleUrls: ["./admins.component.scss"],
})
export class AdminsComponent implements OnInit {
  public modalRef!: NgbModalRef;

  @Input() formData: any;
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  allRecords: any;
  title: string = "Admins";
  actions = ["View", "Edit", "Delete", "Activate"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  channelOptions: any[] = [];
  viewedAgent: any;

  adminsList$: Observable<any> = of([]);

  pageSizeControl = new FormControl(50); 

  pageSizeOptions = [


    { value: 50, name: '50 items' },
    { value: 100, name: '100 items' },
    { value: 200, name: '200 items' },
    { value: 300, name: '300 items' },
    { value: 400, name: '400 items' },
    { value: 500, name: '500 items' },
    { value: 1000, name: '1000 items' },



    // { value: '', name: 'All items' }
  ];
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
    { name: "Created On", prop: "createdOn" },

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
    const model = {
      filter: "all",
      page: 0,
      size:this.pageSizeControl.value,
    };
    this.adminsList$ = this.httpService
      .postReq("portal/api/v1/systemuser/getall", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];

            this.rows = response.map((item: any, index: any) => {
              const myDate = item["createdOn"]?.split(" ")[0];
              let dateObj = new Date(myDate)?.toString().split("GMT")[0];
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

    this.adminsList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
      );
    });

    this.adminsList$ = of(filteredData);
  }
}
