import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode } from "@swimlane/ngx-datatable";
import {
  Observable,
  Subscription,
  TimeoutError,
  catchError,
  map,
  of,
} from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "app-view-diocese-by-county",
  templateUrl: "./view-diocese-by-county.component.html",
  styleUrls: ["./view-diocese-by-county.component.scss"],
})
export class ViewDioceseByCountyComponent implements OnInit, OnDestroy {
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
  diocese: any = {};
  subs: Subscription[] = [];
  total: any;
  Object: any;

  columns = [{ name: "Name", prop: "name" }];

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
    let loadCountyDiocese = this.httpService
      .postReq("portal/api/v1/ag-settings/counties/getcountydiocese", model)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            this.loading = false;
            this.diocese = res.data.diocese;
            console.log(this.diocese, "these are the diocese");
          } else {
            console.error(res.message);
          }
        },
        (error: any) => {
          console.error(error);
        }
      );

    this.subs.push(loadCountyDiocese);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
