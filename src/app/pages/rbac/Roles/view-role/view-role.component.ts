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
import { catchError, map, Observable, Subscription, throwError } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-view-role",
  templateUrl: "./view-role.component.html",
  styleUrls: ["./view-role.component.scss"],
})
export class ViewRoleComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;

  @Input() formData: any;
  public form!: FormGroup;

  ColumnMode = ColumnMode;
  subs: Subscription[] = [];
  total: any;

  public currentUser: any;
  public imageFile!: File;
  public modalRef!: NgbModalRef;
  public roleId!: number;
  public roleDetails: any;
  public resetPassword$!: Observable<any>;

  constructor(
    private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router
  ) {}
  columns = [
    { name: "ID", prop: "frontendId" },
    { name: "name", prop: "name" },
    { name: "remarks", prop: "remarks" },
  ];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.roleId = params["id"];
      }
    });

    this.loadData();
  }

  private loadData(): any {
    this.loading = true;

    let loadRoleDetails = this.httpService
      .getReq(`portal/api/v1/rbac/view-role/${this.roleId}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            console.log(res);

            this.loading = false;
            this.roleDetails = res.data;
          } else {
          }
        },
        (error: any) => {}
      );

    this.subs.push(loadRoleDetails);
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
