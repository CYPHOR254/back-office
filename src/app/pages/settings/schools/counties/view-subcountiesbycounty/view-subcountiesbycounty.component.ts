import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode } from "@swimlane/ngx-datatable";
import {
  Subscription,
} from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";
@Component({
  selector: "app-view-subcountiesbycounty",
  templateUrl: "./view-subcountiesbycounty.component.html",
  styleUrls: ["./view-subcountiesbycounty.component.scss"],
})
export class ViewSubcountiesbycountyComponent implements OnInit, OnDestroy {
  @Input() formData: any;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  id: any;
  filteredRows: any = [];
  totalRecords: number = 0;
  actions = ["ViewSubCouties"];
  ColumnMode = ColumnMode.standard;
  subCounties: any = {};
  subs: Subscription[] = [];
  total: any;
  Object: any;

  public form!: FormGroup;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public countyId!: number;
  
  constructor(
    private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router
  ) {}
  columns = [
    { name: "ID", prop: "id" },
    { name: "Name", prop: "name" },
  ];

  allColumns = [...this.columns];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.id = params["id"];
      }
    });
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;

    let model = {
      id: this.id,
    };
    let loadCountySubcounties = this.httpService
      .postReq("portal/api/v1/ag-settings/counties/getcountysubcounties", model)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            this.loading = false;
            this.subCounties = res.data.subCounty;
            console.log(this.subCounties, "these are the subcounties");
          } else {
            console.error("Failed to load county subcounties:", res.message);
          }
        },
        (error: any) => {
          console.error("Failed to load county subcounties:", error);
        }
      );

    this.subs.push(loadCountySubcounties);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
