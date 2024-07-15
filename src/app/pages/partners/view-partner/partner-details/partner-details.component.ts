import { Component, Input, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-partner-details",
  templateUrl: "./partner-details.component.html",
  styleUrls: ["./partner-details.component.scss"],
})
export class PartnerDetailsComponent implements OnInit {
  @Input() formData: any;
  @Input() partnerId!: any | undefined;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "Schools by Partner";
  actions = ["Viewpartner"];
  filteredRows: any = [];
  totalRecords: number = 0;

  ColumnMode = ColumnMode;
  
  subs: Subscription[] = [];
  total: any;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public form!: FormGroup;
  public partnerDetails: any;


  constructor(
    private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router
  ) {}

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

  allColumns = [...this.columns];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.partnerId = params["id"];
      }
    });

    this.loadData();
  }

  private loadData(): any {
    this.loading = true;

    let loadpartnerDetails = this.httpService
      .getReq(`portal/api/v1/partners/view/${this.partnerId}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            console.log(res);

            this.loading = false;
            this.partnerDetails = res.data;
          } else {
          }
        },
        (error: any) => {}
      );

    this.subs.push(loadpartnerDetails);
  }

  getFullName(firstName: any, lastName: any) {
    let fullname: string = `${firstName} ${lastName}`;
    fullname.toUpperCase;
    fullname = fullname.slice(0, 16);
    return fullname;
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
