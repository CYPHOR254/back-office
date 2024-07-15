import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { Observable, Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-system-user-details',
  templateUrl: './system-user-details.component.html',
  styleUrls: ['./system-user-details.component.scss']
})
export class SystemUserDetailsComponent implements OnInit, OnDestroy {
  @Input() formData: any;
  @Input () systemUserId: number|undefined;
  public form!: FormGroup;
  public currentUser:string|undefined;
  public modalRef!: NgbModalRef;
  public systemUserDetails: any;
  public resetPassword$!: Observable<any>;
  profile: string|undefined;
  subs: Subscription[] = [];
  loading = true;

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

  ColumnMode = ColumnMode;


  constructor(
    private httpService: HttpServService,
    public activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    public fb: FormBuilder,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.systemUserId = params["id"];
      }
    });
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

  private loadData(): void {
    this.loading = true;
    const loadSystemUserDetails = this.httpService
      .getReq(`portal/api/v1/systemuser/view/${this.systemUserId}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            this.loading = false;
            this.systemUserDetails = res.data;
          } else {
            this.loading = false;
          }
        },
        (error: any) => {
          this.loading = false;
        }
      );
    this.subs.push(loadSystemUserDetails);
  }


  getFullName(firstName: any, lastName: any) {
    let fullname: string = `${firstName} ${lastName}`;
    fullname.toUpperCase();
    fullname = fullname.slice(0, 16);
    return fullname;
  }

  blockOrUnblockUser(block: boolean): void {

    const action = block ? "Block" : "Unblock";
    const modalRef = this.modalService.open(ConfirmDialogComponent, {
      centered: true,
      backdrop: "static",
    });
    modalRef.componentInstance.title = `${action} User`;
    modalRef.componentInstance.body = `Do you want to ${action.toLowerCase()} this user?`;

    modalRef.result
      .then((result) => {
        console.log('result***');
        console.log(result);
        
        if (result === "success") {

          console.log("Got here...")
          const payload = {
            username: this.systemUserDetails.email,
            block: block,
          };

          this.httpService
            .postReq("portal/api/v1/systemuser/blockunblock", payload)
            .subscribe({
              next: (res: any) => {
                if (res.status === 1) {
                  this.toastr.warning(res.message, "Warning");
                } else if (res.status === 0) {
                  this.toastr.success(res.message, "Success");
                  this.loadData();
                } else {
                  this.toastr.error(res.message, "Error");
                }
              },
              error: (error: any) => {
                this.toastr.error("Error blocking/unblocking user", "Error");
              },
            });
        }
      })
      .catch((reason) => {
        console.log(`Dismissed with reason: ${reason}`);
      });
  }

}
