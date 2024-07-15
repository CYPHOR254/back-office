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
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-login-history',
  templateUrl: './login-history.component.html',
  styleUrls: ['./login-history.component.scss']
})
export class LoginHistoryComponent implements OnInit {
  @Input() userId: any | undefined;
  title: string = "Login History";

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  allRecords: any;
  OwnLoginHistoryList$: Observable<any> = of([]);
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  viewedHistory: any;
  pageSizeControl = new FormControl(50); 

  pageSizeOptions = [


    { value: 50, name: '50 items' },
    { value: 100, name: '100 items' },
    { value: 200, name: '200 items' },
    { value: 300, name: '300 items' },
    { value: 400, name: '400 items' },
    { value: 500, name: '500 items' },
    { value: 1000, name: '1000 items' },
    { value: 2500, name: '2500 items' },
    { value: 5000, name: '5000 items' },
    { value: 7500, name: '7500 items' },
    { value: 10000, name: '10000 items' },
    { value: 20000, name: '20000 items' },

    // { value: '', name: 'All items' }
  ];

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


  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this. pageSizeControl.valueChanges?.subscribe((val:any)=>{
      console.log(val);
      
       if(val){this.getIndividualData();
         
   
       }});
       this.getIndividualData()  }
  

  getIndividualData(): void {
    this.loading = true;

    const model = {
      id: localStorage.getItem("id"),
      page: 0,
      size:this.pageSizeControl.value,
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
                schoolStatus: item.status,
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
