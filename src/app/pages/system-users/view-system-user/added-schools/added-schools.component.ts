import {
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup} from "@angular/forms";
import { ColumnMode, id } from "@swimlane/ngx-datatable";
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  TimeoutError,
} from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-added-schools',
  templateUrl: './added-schools.component.html',
  styleUrls: ['./added-schools.component.scss']
})
export class AddedSchoolsComponent implements OnInit {
  @Input() formData: any;
  @Input () systemUserId: number|undefined;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "Added Schools";
  actions = ["View School"];
  filteredRows: any = [];
  totalRecords: number = 0;
  viewedSchool: any;
  ColumnMode = ColumnMode;
  subs: Subscription[] = [];
  total: any;

  public form!: FormGroup;
  public currentUser: any;
  public imageFile!: File;
  public modalRef!: NgbModalRef;
  public SchoolDetails: any;

  constructor(
    private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    private toastr: ToastrService
  ) {}

  columns = [
    { name: "Name", prop: "name" },
    { name: "Created On", prop: "createdOn" },
    { name: "County", prop: "county" },
  ];

  allColumns = [...this.columns];

  schoolList$: Observable<any> = of([]);

  ngOnInit(): void {


    this.getSchoolSchoolsData();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
  getSchoolSchoolsData() {
    this.loading = true;
    const model = {
      systemUserId:this.systemUserId,
    };
    this.schoolList$ = this.httpService
      .postReq("portal/api/v1/schools/for-agent", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];
            console.log(response, "schools for agents");

            this.rows = response.map((item: any, index: any) => {
              const res = {
                ...item,
                frontendId: index + 1,
              };
              return res;
            });
            this.rows = this.rows.filter((row: any) => row !== undefined);
            this.totalRecords = this.rows.length;
            this.loading = false;
            return this.rows;
          } else {
            this.loading = false;
            return of([]);
          }
        }),
        catchError((error: any) => {
          this.loading = false;
          if (error instanceof TimeoutError) {
            this.toastr.error(error["message"], "API Timeout");
          } else {
            this.toastr.error(
              error["statusText"] || error["message"],
              "Data Not Fetched"
            );
          }
          return of([]);
        })
      );
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);
    this.viewedSchool = eventData["row"]["id"];

    if (eventData.action == "View") {
      this.router.navigate([`/schools/view-School/${this.viewedSchool}`]);
    }
  }
}
