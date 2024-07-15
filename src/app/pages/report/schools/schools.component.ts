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
  selector: "app-schools",
  templateUrl: "./schools.component.html",
  styleUrls: ["./schools.component.scss"],
})
export class SchoolsComponent implements OnInit {
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  activeId = 0;
  title: string = "schools";
  actions = ["View", "Edit", "Delete", "Activate"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  channelOptions: any[] = [];
  allRecords: any;
  schoolsList$: Observable<any> = of([]);


  public modalRef!: NgbModalRef;

  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService
  ) {}
  columns = [
    { name: "Name", prop: "name" },
    { name: "Category", prop: "category" },
    { name: "Curriculum", prop: "curriculum" },
    { name: "county", prop: "county" },
    { name: "Status", prop: "status" },
    { name: "Created On", prop: "createdOn" },
    { name: "Actions", prop: "actions" },
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
      page: 0,
      size: 100,
      id: "",
      name: "",
      type: "",
      category: "",
      schoolGender: "",
      curriculum: "",
      postalCode: "",
      postalAddress: "",
      moeRegistrationNumber: "",
      idNumber: "",
      mobileNumber: "",
      emailAddress: "",
      domain: "",
      subCounty: "",
      county: "",
      diocese: "",
      from: "",
      to: "",
    };
    this.schoolsList$ = this.httpService
      .postReq("portal/api/v1/schools/getall", model)
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
            this.toastr.error(error["message"]);
          } else {
            this.toastr.error(error["statusText"] || error["message"]);
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

    this.schoolsList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
      );
    });

    this.schoolsList$ = of(filteredData);
  }
}
