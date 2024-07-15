import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {catchError, map, Observable, observable, of, Subscription, throwError, TimeoutError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import { HttpServService } from 'src/app/shared/services/http-serv.service';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { UserActionsModalComponent } from 'src/app/shared/components/user-actions-modal/user-actions-modal.component';
import { EditSystemUserComponent } from '../edit-system-user/edit-system-user.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-blocked-system-users',
  templateUrl: './blocked-system-users.component.html',
  styleUrls: ['./blocked-system-users.component.scss']
})
export class BlockedSystemUsersComponent implements OnInit {
  public modalRef!: NgbModalRef;
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;

  columns = [
    // {name: 'ID', prop: 'frontendId'},
    {name: 'First Name', prop: 'firstName'},
    {name: 'Middle Name', prop: 'middleName'},
    {name: 'Last Name', prop: 'lastName'},
    // {name: 'Phone Number', prop: 'phoneNumber'},
    {name: 'Profile', prop: 'profile'},
    {name: 'Blocked', prop: 'blocked' },
    // {name: 'Id Number', prop: 'idNumber'},
    {name:'Email',prop:'email'},
     {name: 'Created On', prop: 'createdOn'},
    {name: 'Actions', prop: 'actions' },
    
  ];

  allColumns = [...this.columns];
  systemUserList$: Observable<any> = of([]);
  // public modalRef: NgbModalRef;
  title: string = "System User";
  actions = ["View", "Delete"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  viewedSystemUser: any;
  pageSizeControl = new FormControl(50); 

  pageSizeOptions = [


    { value: 50, name: '50 items' },
    { value: 100, name: '100 items' },
    { value: 200, name: '200 items' },
    { value: 300, name: '300 items' },
    { value: 400, name: '400 items' },
    { value: 500, name: '500 items' },
    { value: 1000, name: '1000 items' },



    // { value: '', name: 'All items' }
  ];
  constructor(
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  }

  getIndividualData(): void {
    this.loading = true;

    const model = {
      filter: "all",
      blocked:true,
      page: 0,
      size:this.pageSizeControl.value,
    
    };

    this.systemUserList$ = this.httpService
    .postReq("portal/api/v1/systemuser/getall", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];
            console.log(response);

            this.rows = response.map((item: any, index: any) => {
              const myDate = item["createdOn"]?.split(" ")[0];
              let dateObj = new Date(myDate)?.toString().split("GMT")[0];
              dateObj = dateObj.replace(" 03:00:00", "");
  
              const res = { ...item, frontendId: index + 1, createdOn: dateObj };
  
              return res;
            });
            this.rows = this.rows.filter((row: any) => row !== undefined);

            // Get my user details
            let myUserDetails = this.rows.filter((user: any) => user.email == localStorage.getItem('username'))

            if (myUserDetails) {
              localStorage.setItem('userId', myUserDetails[0]?.id);
            }

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
  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

 
  triggerEvent(data: string) {
    let eventData = JSON.parse(data);

    if (eventData.action == "View") {
      this.viewedSystemUser = eventData["row"]["id"];
      this.router.navigate([`/system-users/view-system-user/${this.viewedSystemUser}`]);
    }     else if (eventData.action == "Delete") {
      this.deleteSystemUser(eventData.row);
    }

  
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }

  deleteSystemUser(row: any) {
    this.modalRef = this.modalService.open(UserActionsModalComponent, {centered: true});
    this.modalRef.componentInstance.title = `Delete System User`;
    this.modalRef.componentInstance.buttonLabel = `Delete System User`;
    this.modalRef.componentInstance.body = `Do you want to  Delete this System User?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result);
      if (result?.status === 'success') {
        const model = {
          id: row.id,
          remark: result?.remark
        };

        let suspendAgent = this.httpService
            .postReq("portal/api/v1/systemuser/delete", model)
            .subscribe({
              next: (resp) => {
                if (resp["status"] === 0) {
                  this.toastr.success(resp?.message ,'Sucsess');
                  this.getIndividualData();
                } else {
                  this.toastr.error(resp?.message,'Error');
                }
              }, error: (error) => {
                this.loading = false;
                this.toastr.error(error["statusText"] || error["message"] || error.error["message"]);
              },
            });

        this.subs.push(suspendAgent);
      }

    })
  }

  resetUserPassword(formData: any) {

    console.log('formData');
    console.log(formData);
    
    this.modalRef = this.modalService.open(ConfirmDialogComponent, {
      centered: true, animation: true,
    });
  
    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = "Reset user's password";
    this.modalRef.componentInstance.body = "Confirm Reset Password";

    this.modalRef.result.then((result) => {
      if (result === 'success') {
        
        let model = {
          "username": formData?.row?.email,
      
        }
    
    
        this.httpService.postReq('portal/api/v1/systemuser/admin/reset/password', model).subscribe(
          (result: any) => {
            if (result.status === 0) {
              
              this.toastr.success(result?.message,'Success');
              console.log('result')
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


  }

