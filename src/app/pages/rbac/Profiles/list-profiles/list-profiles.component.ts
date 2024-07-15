import {Component,OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {catchError, map, Observable, of,Subscription,TimeoutError} from 'rxjs';
import {HttpServService} from "../../../../shared/services/http-serv.service";
import {ToastrService} from "ngx-toastr";
import { AddProfileComponent } from '../add-profile/add-profile.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-list-profile',
  templateUrl: './list-profiles.component.html',
  styleUrls: ['./list-profiles.component.scss']
})
export class ListProfilesComponent implements OnInit {
  public modalRef!: NgbModalRef;

  loading: boolean = true;

  rows: any = [];
  filteredRows: any = [];

  defaultNavActiveId = 1;

  columns = [
    {name: 'ID', prop: 'frontendId'},
    {name: 'Name', prop: 'name'},
    {name: 'Remarks', prop: 'remarks'},
    {name: 'Role Type', prop: 'systemRole'},
    {name: 'Created On', prop: 'createdOn'},
    // {name:'Last Update', prop: 'createdOn' },
    // { name: 'Is Active', prop: 'isActive' },
    { name: 'Actions', prop: 'id' },
  ];


  allColumns = [...this.columns];
  profilesList$: Observable<any> = of([]);

  // public modalRef: NgbModalRef;

  title: string = "Profile";
  actions = ["View", "Edit","Delete"];
  totalRecords: number = 0;

  subs: Subscription[] = [];
  viewedProfile: any;
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

  getIndividualData(page: number = 0, size: number = 500): void {
    this.loading = true;

    const model = {
      filter: "all",
      page: page,
      size: size,
    };




    this.profilesList$ = this.httpService
      .postReq("portal/api/v1/profiles/getall", model)
      .pipe(
        map((resp: any) => {

          if (resp["status"] === 0) {
            let response = resp["data"];
            console.log(response);
            

            this.rows = response.map((item: any, index: any) => {
              const myDate = item["createdOn"].split(" ")[0];
              let dateObj = new Date(myDate).toString().split("GMT")[0];
              dateObj = dateObj.replace(" 03:00:00", "");

              const res = {
                ...item,
                frontendId: index + 1,
                createdOn: dateObj,
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

  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);

    if (eventData.action == "View") {
      this.viewedProfile = eventData["row"]["id"];
      this.router.navigate([`/rbac/profile/${this.viewedProfile}`]);
    } else if (eventData.action == "Edit") {
      this.editProfile(eventData.row);
    } 
    else if (eventData.action == "Delete") {
      this.deleteProfile(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }
  addProfile() {
    this.modalRef = this.modalService.open(AddProfileComponent, {
      centered: true,
      animation: true,
    });

    this.modalRef.componentInstance.title = "Add Profile";
    // reload
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.getIndividualData();
      }
    }, (reason) => {
      console.log(reason);
    });


  }
  editProfile(formData: any) {
    this.modalRef = this.modalService.open(EditProfileComponent, {
      centered: true, animation: true,
    });

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = "Edit Profile";
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.getIndividualData();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  
  deleteProfile(profileData: any) {

    this.modalRef = this.modalService.open(ConfirmDialogComponent, {centered: true});
    this.modalRef.componentInstance.title = 'Delete Profile';
    this.modalRef.componentInstance.body = 'Do you want to delete this profile?';
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        const model =  {
          id: profileData.id,
        }
        this.httpService.postReq('portal/api/v1/profiles/delete', model).subscribe(
          (result: any) => {
            if (result.status === 0) {
              this.getIndividualData();
            } else {

            }
          }
        );
      }
    });
  }
  
  }