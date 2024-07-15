import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ColumnMode, id } from "@swimlane/ngx-datatable";
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  throwError,
  TimeoutError,
} from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-view-school",
  templateUrl: "./view-school.component.html",
  styleUrls: ["./view-school.component.scss"],
})
export class ViewSchoolComponent implements OnInit {
  @Input() formData: any;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "Schools by School";
  filteredRows: any = [];
  totalRecords: number = 0;
  viewedSchool: any;
  subs: Subscription[] = [];
  total: any;
  ColumnMode = ColumnMode;

  public form!: FormGroup;
  public currentUser: any;
  public imageFile!: File;
  public modalRef!: NgbModalRef;
  public schoolId!: number;
  public SchoolDetails: any;

  constructor(
    private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
  ) {}
  
  columns = [
    { name: "Name", prop: "name" },
    { name: "County", prop: "county" },
  ];
  allColumns = [...this.columns];

  schoolList$: Observable<any> = of([]);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.schoolId = params["id"];
      }
    });

    this.getSchoolSchoolsData();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  getSchoolSchoolsData() {
    this.loading = true;

    let loadAgentDetails = this.httpService
      .getReq(`portal/api/v1/agents/view/${this.schoolId}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            console.log(res);

            this.loading = false;
            this.SchoolDetails = res.data;
          } else {
          }
        },
        (error: any) => {}
      );

    this.subs.push(loadAgentDetails);
  }
}
