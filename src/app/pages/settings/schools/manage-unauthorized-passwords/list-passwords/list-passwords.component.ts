import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subscription, TimeoutError, catchError, map, of } from "rxjs";
import { UserActionsModalComponent } from "src/app/shared/components/user-actions-modal/user-actions-modal.component";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { AddPasswordsComponent } from "../add-passwords/add-passwords.component";
import { ConfirmDialogComponent } from "src/app/shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-list-passwords',
  templateUrl: './list-passwords.component.html',
  styleUrls: ['./list-passwords.component.scss']
})
export class ListPasswordsComponent implements OnInit, OnDestroy {
  loading: boolean = true;
  rows: any[] = [];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  public modalRef!: NgbModalRef;
  columns = [
    { prop: 'selected', name: 'Select', cellTemplate: 'selectTemplate' },
    { prop: 'password', name: 'Password' },
    { prop: 'actions', name: 'Actions', cellTemplate: 'actionsTemplate' }
  ];

  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData() {
    this.loading = true;
    this.httpService.postReq("portal/api/v1/passwords/unauthorized/getall", {})
      .pipe(
        map((resp: any) => {
          if (resp.status === 0) {
            let response = resp.data;
            console.log(response);

            this.rows = response.unauthorizedPassword.map((password: string, index: number) => ({
              frontendId: index + 1,
              password,
              selected: false 
            }));
            this.totalRecords = this.rows.length;
            this.loading = false;
            return this.rows;
          } else {
            this.toastr.error(resp.message, "Error");
            this.loading = false;
            return of([]);
          }
        }),
        catchError((error: any) => {
          this.loading = false;
          if (error instanceof TimeoutError) {
            this.toastr.error(error.message, "API Timeout");
          } else {
            this.toastr.error(error.statusText || error.message, "Data Not Fetched");
          }
          return of([]);
        })
      ).subscribe();
  }

  openCreatePasswordModal() {
    this.modalRef = this.modalService.open(AddPasswordsComponent, { centered: true });
    this.modalRef.componentInstance.title = 'Add Password';
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.getIndividualData();
      }
    }).catch(() => {
      // Handle modal dismissal
    });
  }

  editPassword(row: any) {
    console.log('Edit password:', row);
  }

  

  deletePassword(row: any) {
    this.modalRef = this.modalService.open(ConfirmDialogComponent, {
      centered: true,
      animation: true,
    });
  
    this.modalRef.componentInstance.formData = row;
    this.modalRef.componentInstance.title = `Delete Password`;
    this.modalRef.componentInstance.body = `Do you want to delete this password?`;
  
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        let model = {
          unauthorizedPassword: [row.password],
        };
  
        this.httpService.postReq('portal/api/v1/passwords/unauthorized/delete', model).subscribe(
          (result: any) => {
            if (result.status === 0) {
              this.toastr.success(result?.message, 'Success');
           
            } else {
              this.toastr.error(result?.message, 'Error');
            }
          }
        );
      }
    }, (reason) => {
      console.log(reason);
    });
  }
  
  deleteSelectedPasswords() {
    const selectedRows = this.rows.filter(row => row.selected);
    if (selectedRows.length === 0) {
      this.toastr.warning("Please select at least one password to delete.");
      return;
    }
  
    this.modalRef = this.modalService.open(ConfirmDialogComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = `Delete Passwords`;
    this.modalRef.componentInstance.body = `Do you want to delete the selected passwords?`;
  
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        const unauthorizedPasswords = selectedRows.map(row => row.password);
        const model = {
          unauthorizedPassword: unauthorizedPasswords,
        };
        this.httpService.postReq("portal/api/v1/passwords/unauthorized/delete", model)
          .subscribe({
            next: (resp: any) => {
              if (resp.status === 0) {
                this.toastr.success(resp.message, "Success");
              } else {
                this.toastr.error(resp.message, "Error");
              }
            },
            error: (error: any) => {
              this.toastr.error(error.statusText || error.message || error.error.message);
            },
          });
      }
    }).catch(() => {
      console.log("Modal dismissed");
    });
  }
  
}
