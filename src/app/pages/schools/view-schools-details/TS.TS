import { Component, Input, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode, id } from "@swimlane/ngx-datatable";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-view-schools-details",
  templateUrl: "./view-schools-details.component.html",
  styleUrls: ["./view-schools-details.component.scss"],
})
export class ViewSchoolsDetailsComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "Schools by agent";
  actions = ["Viewagent"];
  filteredRows: any = [];
  totalRecords: number = 0;
  MenuOutline: any[] = [];

  columns = [
    { name: "ID", prop: "frontendId" },
    { name: "firstName", prop: "firstName" },
    { name: "middleName", prop: "middleName" },
    { name: "lastName", prop: "lastName" },
    { name: "phoneNumber", prop: "phoneNumber" },
    { name: "idNumber", prop: "idNumber" },
    { name: "createdBy", prop: "createdBy" },
    { name: "Actions", prop: "actions" },
  ];

  @Input() formData: any;
  public form!: FormGroup;

  ColumnMode = ColumnMode;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public schoolId!: number;
  public schoolDetails: any;

  subs: Subscription[] = [];
  total: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    public httpService: HttpServService
  ) {
    
  }

  allColumns = [...this.columns];

  ngOnInit(): void {

    
    this.getMenuOutline();
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.schoolId = params["id"];
        console.log(this.schoolId, 'school id for school details');
        
      }
    });
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  getMenuOutline() {
    this.loading = true;
    const model = null;
    this.httpService
      .postReq("portal/api/v1/documents/menu-codes/getall", model)
      .subscribe((response: any) => {
        if (response.status == 0 && response.message === "SUCCESS") {
          this.MenuOutline = response.data;

          // this.MenuOutlineIds= this.MenuOutline.map((item: any) => item.id);
          // console.log(this.MenuOutlineIds, 'menuCodeid');
        }
      });
  }
}
