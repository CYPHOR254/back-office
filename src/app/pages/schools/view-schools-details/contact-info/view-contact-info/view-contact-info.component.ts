import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-view-contact-info",
  templateUrl: "./view-contact-info.component.html",
  styleUrls: ["./view-contact-info.component.scss"],
})
export class ViewContactInfoComponent implements OnInit {
  @Input() contactId: any | undefined;
  @Input() formData: any;

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;
  title: string = "Contact Info";
  filteredRows: any = [];
  totalRecords: number = 0;
  contactList: any;
  ColumnMode = ColumnMode;
  subs: Subscription[] = [];
  total: any;

  public form!: FormGroup;
  public currentUser: any;
  public modalRef!: NgbModalRef;
  public contactList$: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    private httpService: HttpServService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      console.log("params::");
      console.log(params);
      if (typeof params["id"] !== "undefined") {
        this.contactId = params["id"];
        this.loadData(this.contactId);
      }
    });
  }
  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private loadData(id: number): any {
    console.log("id");
    console.log(id);

    this.loading = true;

    let contactList$ = this.httpService
      .getReq(`portal/api/v1/schools/contacts/view/${this.contactId}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            console.log(res);

            this.loading = false;
            this.contactList = res.data;
          } else {
          }
        },
        (error: any) => {}
      );

    this.subs.push(contactList$);
  }
}
