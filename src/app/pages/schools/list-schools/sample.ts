import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { map, switchMap, tap } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { FormControl } from "@angular/forms";
import { Observable, of, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-list-schools",
  templateUrl: "./list-schools.component.html",
  styleUrls: ["./list-schools.component.scss"],
})
export class ListSchoolsComponent implements OnInit, OnDestroy {
  @Input() formData: any;
  pageSize: FormControl = new FormControl(2);
  currentPageIndex: number = 0; 

  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "Schools";
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  schoolList: any[] = [];
  viewedSchool: any;
  schoolList$: Observable<any> | undefined;
  allRecords: any;
  profile: any;

  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  columns = [
    { name: "Name", prop: "name" },
    { name: "Category", prop: "category" },
    { name: "Curriculum", prop: "curriculum" },
    { name: "County", prop: "county" },
    { name: "Created On", prop: "createdOn" },
    { name: "Status", prop: "schoolStatus" },
    { name: "Actions", prop: "actions" },
  ];
  allColumns = [...this.columns];

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit(): void {
    this.profile = localStorage.getItem("profile");

    this.pageSize.valueChanges.subscribe(val => {
      if (val) {
        this.currentPageIndex = 0;
        this.getAllSchools();
      }
    });

   
    this.getAllSchools();
  }

  getAllSchools(): void {
    const model: any = {
      page: this.currentPageIndex,
      size: this.pageSize.value,
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

    let apiUrl = "portal/api/v1/schools/getall"; // Default API endpoint

    // Adjust model and API URL for partner role
    if (this.profile === "ROLE_PARTNER") {
      model.status = ["APPROVED", "REJECTED", "CLARIFICATION", "SUBMITTED"];
      apiUrl = "portal/api/v1/schools/getall"; // Example endpoint for filtered data
    }

    this.loading = true;

    this.httpService.postReq(apiUrl, model).subscribe(
      (resp: any) => {
        if (resp["status"] !== 0) {
          this.toastr.error("Unable to fetch schools", "Error");
        } else {
          this.allRecords = resp.data.map((item: any, index: any) => {
            const myDate = item["createdOn"].split(" ")[0];
            let dateObj = new Date(myDate).toString().split("GMT")[0];
            dateObj = dateObj.replace(" 03:00:00", "");

            return {
              ...item,
              frontendId: index + 1,
              schoolStatus: item.status,
              createdOn: dateObj,
            };
          });

          this.applyFiltersAndPagination(); // Apply filters and pagination
          this.loading = false;
        }
      },
      (error) => {
        this.toastr.error("Error occurred while fetching schools", "Error");
        this.loading = false;
      }
    );
  }

  applyFiltersAndPagination(): void {
    let filteredData = this.allRecords;

    // Filter by any search criteria
    if (this.filteredRows.length > 0) {
      filteredData = filteredData.filter((row: any) =>
        this.filteredRows.includes(row.id)
      );
    }

    // Apply pagination
    this.totalRecords = filteredData.length;
    const startIndex = this.currentPageIndex * this.pageSize.value;
    this.rows = filteredData.slice(startIndex, startIndex + this.pageSize.value);
  }

  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = JSON.parse(data);
    this.applyFiltersAndPagination(); // Re-apply filters and pagination
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);

    if (eventData.action == "View") {
      this.viewedSchool = eventData["row"]["id"];
      this.router.navigate([`/schools/view-school/${this.viewedSchool}`]);
    } else if (eventData.action == "Approve") {
      this.router.navigate([`/schools/view-school/${this.viewedSchool}`]);
    } else if (eventData.action == "Decline") {
      this.router.navigate([`/schools/view-school/${this.viewedSchool}`]);
    }
  }

  searchResultUniversal(event: any) {
    const filteredData = this.allRecords.filter((item: any) =>
      Object.values(item).some(
        (value: any) =>
          value &&
          value
            .toString()
            .toLowerCase()
            .includes(event.toLowerCase())
      )
    );

    this.filteredRows = filteredData.map((item: any) => item.id);
    this.applyFiltersAndPagination(); // Re-apply filters and pagination
  }

  searchResultByDate(event: any) {
    const filteredData = this.allRecords.filter((item: any) => {
      const createdOnDate = new Date(item.createdOn);
      return (
        createdOnDate >= event.startDate && createdOnDate <= event.endDate
      );
    });

    this.filteredRows = filteredData.map((item: any) => item.id);
    this.applyFiltersAndPagination(); // Re-apply filters and pagination
  }
}
