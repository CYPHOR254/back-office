import { Component, Input, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { map, Observable, of, Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { Router } from "@angular/router";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-all-schools",
  templateUrl: "./all-schools.component.html",
  styleUrls: ["./all-schools.component.scss"],
})
export class AllSchoolsComponent implements OnInit {
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "All Schols";
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  schoolList: any[] = [];
  channelOptions: any[] = [];
  viewedSchool: any;
  schoolList$: Observable<any> = of([]);
  allRecords: any;
  pageSizeControl = new FormControl(50); 
  profile: string | null | undefined;
  
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
    private router: Router

  ) {}

  columns = [
    { name: "Name", prop: "name" },
    { name: "Category", prop: "category" },
    { name: "Curriculum", prop: "curriculum" },
    { name: "county", prop: "county" },
    { name: "Status", prop: "schoolStatus" },
    { name: "Created On", prop: "createdOn" },
  ];
  allColumns = [...this.columns];

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit(): void {
    this.profile = localStorage.getItem("profile");
    this.pageSizeControl.valueChanges.subscribe(val=>{
      if (val){
        this.getIndividualData();
      } 
    })
    this.getIndividualData();
  }
  
  
  getIndividualData(): void {
    this.loading = true;
    const model: any = {  
      page: 0,
      size: this.pageSizeControl.value,
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
  
    let apiUrl = 'portal/api/v1/schools/getall'; // Default API endpoint
  
    // Check if user is a partner and adjust model and API URL accordingly
    if (this.profile === 'ROLE_PARTNER') {
      model.status = ['APPROVED', 'REJECTED', 'CLARIFICATION'];
      apiUrl = 'portal/api/v1/schools/getall'; // Example endpoint for filtered data
    }
  
    this.schoolList$ = this.httpService.postReq(apiUrl, model).pipe(
      map((resp: any) => {
        if (resp["status"] === 0) {
          let response = resp["data"];
          this.allRecords = resp["data"];
  
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
