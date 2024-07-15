import { Component, Input, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode, id } from "@swimlane/ngx-datatable";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-agent-details",
  templateUrl: "./agent-details.component.html",
  styleUrls: ["./agent-details.component.scss"],
})
export class AgentDetailsComponent implements OnInit {
  @Input() formData: any;
  @Input() agentId: any | undefined;
  
  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "Schools by agent";
  actions = ["Viewagent"];
  filteredRows: any = [];
  totalRecords: number = 0;
  ColumnMode = ColumnMode;
  subs: Subscription[] = [];
  total: any;

  public form!: FormGroup;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public agentDetails: any;

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
        this.agentId = params["id"];
      }
    });

    this.loadData();
  }

  private loadData(): any {
    this.loading = true;
    this.httpService
      .getReq(`portal/api/v1/agents/view/${this.agentId}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            console.log(res);

            this.loading = false;
            this.agentDetails = res.data;
          } 
          else {
          }
        },
        (error: any) => {}
      );

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
