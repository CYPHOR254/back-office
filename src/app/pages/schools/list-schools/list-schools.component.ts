import { Component, Input, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { map, Observable, of, Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { UserActionsModalComponent } from "src/app/shared/components/user-actions-modal/user-actions-modal.component";
import { AddSchoolComponent } from "../add-school/add-school.component";


@Component({
  selector: "app-list-schools",
  templateUrl: "./list-schools.component.html",
  styleUrls: ["./list-schools.component.scss"],
})
export class ListSchoolsComponent implements OnInit {
  public modalRef!: NgbModalRef;
  @Input() formData: any;
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "school";
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  schoolList: any[] = [];
  channelOptions: any[] = [];
  viewedSchool: any;
  schoolList$: Observable<any> = of([]);

  columns = [
    { name: "Name", prop: "name" },
    { name: "Category", prop: "category" },
    // { name: "Gender", prop: "schoolGender" },
    { name: "Curriculum", prop: "curriculum" },
    // { name: 'postalCode', prop: 'postalCode' },
    // { name: 'postalAddress', prop: 'postalAddress' },
    // { name: 'moeRegistrationNumber', prop: 'moeRegistrationNumber' },
    // { name: 'idNumber', prop: 'idNumber' },
    // { name: 'mobileNumber', prop: 'mobileNumber' },
    // { name: 'emailAddress', prop: 'emailAddress' },
    { name: 'county', prop: 'county' },
    { name: 'subCounty', prop: 'subCounty' },
    // { name: 'diocese', prop: 'diocese' },
    //  { name: 'from', prop: 'from' },
    //  { name: 'to', prop: 'to' },
    // { name: 'from', prop: 'from' },
    // { name: "Status", prop: "status" },

    { name: "Actions", prop: "actions" },

  ];
  
  allRecords: any;
  allColumns = [...this.columns];

  constructor(
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit(): void {
    this.getIndividualData();
  }
  getIndividualData(): void {
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

    this.schoolList$ = this.httpService.postReq("portal/api/v1/schools/getall", model).pipe(
      map((resp: any) => {
        if (resp["status"] === 0) {
          let response = resp["data"];

          this.allRecords = resp['data'];
          

          this.rows = response.map((item: any, index: any) => {
            const myDate = item["createdOn"].split(" ")[0];
            let dateObj = new Date(myDate).toString().split("GMT")[0];
            dateObj = dateObj.replace(" 03:00:00", "");

            const res = { ...item, frontendId: index + 1, createdOn: dateObj };

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

 triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    this.viewedSchool = eventData["row"]["id"];

    if (eventData.action == "View") {
      this.router.navigate([`/agents/view-agent/${this.viewedSchool}`]);
    
    } else if (eventData.action == "Edit") {
      // this.openEditSystemAdminModal(eventData.row); // Open edit modal with data
    } else if (eventData.action == "Delete") {
      // this.disableAgent(eventData.row);
    }
  }
  
  



  searchResultUniversal(event: any) {

    const filteredData = this.allRecords?.filter((item: any) => {
      
      return Object.values(item)?.some((value: any) => {
        let str = value + '';
        return str?.toLowerCase()?.includes(event?.toLowerCase())
      }
      )
    }
      
    );
    
    this.schoolList$ = of(filteredData);
    
  }

  
  searchResultByDate(event: any) {

    const filteredData = this.allRecords.filter((item:any) => {
      const createdOnDate = new Date(item.createdOn);
      return createdOnDate >= event?.startDate && createdOnDate <= event?.endDate;
    });
    
    this.schoolList$ = of(filteredData);
    
  }

  private disableSchool(row: any) {
    this.modalRef = this.modalService.open(UserActionsModalComponent, {
      centered: true,
    });
    this.modalRef.componentInstance.title = `Delete School`;
    this.modalRef.componentInstance.buttonLabel = `Delete School`;
    this.modalRef.componentInstance.body = `Do you want to  Delete this School?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result);
      if (result?.status === "success") {
        const model = {
          id: row.id,
          remark: result?.remark,
        };

        let suspendSchool = this.httpService
          .postReq("Schools/delete", model)
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
              // Handle the error here
              this.loading = false;
              this.toastr.error(
                error["statusText"] ||
                  error["message"] ||
                  error.error["message"],
                "School not suspended."
              );
            },
          });

        this.subs.push(suspendSchool);
      }
    });
  }
  addSchool() {
    this.modalRef = this.modalService.open(AddSchoolComponent, {
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
}
