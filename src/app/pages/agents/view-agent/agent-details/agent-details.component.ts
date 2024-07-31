import { Component, Input, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode, id } from "@swimlane/ngx-datatable";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ApiService } from "src/app/api.service";
import { ToastrService } from "ngx-toastr";

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
  title: string = "agents by agent";
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
    private toastr: ToastrService,
    public router: Router,
    private apiService: ApiService // Adjust based on your actual service implementation

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
    this.getAgentDetails();
    // this.loadData();
  }

  // private loadData(): any {
  //   this.loading = true;
  //   this.httpService
  //     .getReq(`portal/api/v1/agents/view/${this.agentId}`)
  //     .subscribe(
  //       (res: any) => {
  //         if (res.status === 0) {
  //           console.log(res);

  //           this.loading = false;
  //           this.agentDetails = res.data;
  //         } 
  //         else {
  //         }
  //       },
  //       (error: any) => {}
  //     );

  // }

  getAgentDetails(): void {
    this.loading = true;
    this.apiService.getAgentById(this.agentId)
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response.statusCode === 200) {
            this.agentDetails = response.result;
            console.log("Fetched Agents details:", this.agentDetails);  // Debugging
            // this.getMenuStatus(this.agentDetails?.menuCodeId);
          } else {
            this.toastr.error('Failed to fetch agent details:', response.message);
          }
        },
        (error: any) => {
          this.loading = false;
          this.toastr.error('Error fetching agent details:', error.message);
        }
      );
  }

  getFullName(firstName: any,middleName:any , lastName: any) {
    let fullname: string = `${firstName} ${middleName} ${lastName}`;
    fullname.toUpperCase;
    fullname = fullname.slice(0, 16);
    return fullname;
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
