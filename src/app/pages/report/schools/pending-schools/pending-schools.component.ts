import { Component, Input, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import {
  map,
  Observable,
  of,
  Subscription,
} from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-pending-schools",
  templateUrl: "./pending-schools.component.html",
  styleUrls: ["./pending-schools.component.scss"],
})
export class PendingSchoolsComponent implements OnInit {
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "Pending Schools";
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  schoolList: any[] = [];
  channelOptions: any[] = [];
  viewedSchool: any;
  schoolList$: Observable<any> = of([]);
  allRecords: any;
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
    private toastr: ToastrService
  ) {}

  columns = [
    { name: "Name", prop: "name" },
    { name: "Category", prop: "category" },
    { name: "Curriculum", prop: "curriculum" },
    { name: "County", prop: "county" },
    { name: "Status", prop: "status" },
    { name: "Created On", prop: "createdOn" },
  ];
  allColumns = [...this.columns];

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit(): void {
    this. pageSizeControl.valueChanges?.subscribe((val:any)=>{
      console.log(val);
      
       if(val){this.getIndividualData();
         
   
       }});
    this.getIndividualData();
  }

  getIndividualData(): void {
    this.loading = true;
    const model = {
      page: 0,
      size:this.pageSizeControl.value,
      status: ["PENDING"],
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

    this.schoolList$ = this.httpService
      .postReq("portal/api/v1/schools/getall", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];

            this.allRecords = response;

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

            this.totalRecords = this.rows.length;

            this.loading = false;
            return this.rows;
          } else {
            this.toastr.error("Unable to fetch schools", "Error");
            this.loading = false;
            return of([]);
          }
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

    this.schoolList$ = of(filteredData);
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event?.startDate && createdOnDate <= event?.endDate
      );
    });

    this.schoolList$ = of(filteredData);
  }
}
