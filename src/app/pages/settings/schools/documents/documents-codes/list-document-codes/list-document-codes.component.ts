import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {catchError, map, Observable, observable, of, Subscription, throwError, TimeoutError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import { HttpServService } from 'src/app/shared/services/http-serv.service';
import { UserActionsModalComponent } from 'src/app/shared/components/user-actions-modal/user-actions-modal.component';
import { AddDocumentCodeComponent } from '../add-document-code/add-document-code.component';
import { UpdateDocumentCodeComponent } from '../update-document-code/update-document-code.component';

@Component({
  selector: 'app-list-document-codes',
  templateUrl: './list-document-codes.component.html',
  styleUrls: ['./list-document-codes.component.scss']
})
export class ListDocumentCodesComponent implements OnInit {
  public modalRef!: NgbModalRef;
  // @Input() title: any;
  @Input() formData: any;

  loading: boolean = true;
  rows: any = [];
  totalRecords: number = 0;
  filteredRows: any = [];
  defaultNavActiveId = 1;

  // public modalRef: NgbModalRef;
  title: string = "Document Code";
  actions = ["Edit"];
  subs: Subscription[] = [];
  channelOptions:any[] = [];
  viewedAgent: any;
  
  constructor(
    private httpService: HttpServService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
    
  ) {}

  columns = [
    {name: 'Name', prop: 'name'},
    {name: 'Remarks', prop: 'remarks'},  
    {name: 'Records Required', prop: 'recordsRequired'},  
    {name: 'Required', prop: 'required'},
    {name: 'Actions', prop: 'actions' },
  ];

  allColumns = [...this.columns];
  schoolDocumentCodeList$: Observable<any> = of([]);
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  
  }

  getIndividualData() {
    this.loading = true;
    const model = null;
    this.schoolDocumentCodeList$ = this.httpService
    .postReq("portal/api/v1/documents/menu-codes/getall", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];
            console.log(response);

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
  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

  triggerEvent(data: string) {
    let eventData = JSON.parse(data);

    if (eventData.action == "Edit") {
      this.editSchoolDocumentCode(eventData.row);
    } 
    else if (eventData.action == "Delete") {
      this.deleteSchoolDocumentCode(eventData.row);
    }
  }

  updateFilteredRowsEvent(data: string) {
    this.filteredRows = data;
  }
  
  addSchoolDocumentCode() {
    this.modalRef = this.modalService.open(AddDocumentCodeComponent, {
      centered: true,
      animation: true,
    });
    this.modalRef.componentInstance.title = "Add school DocumentCode";
    // reload
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.getIndividualData();
      }
    }, (reason) => {
      console.log(reason);
    });


  
  }
  editSchoolDocumentCode(formData: any) {
    this.modalRef = this.modalService.open(UpdateDocumentCodeComponent, {
      centered: true, animation: true,
    });

    this.modalRef.componentInstance.formData = formData;
    this.modalRef.componentInstance.title = "Edit School DocumentCode";
    this.modalRef.result.then((result) => {
      if (result === 'success') {
        this.getIndividualData();
      }
    }, (reason) => {
      console.log(reason);
    });
  }

  

  private deleteSchoolDocumentCode(row: any) {
    this.modalRef = this.modalService.open(UserActionsModalComponent, {centered: true});
    this.modalRef.componentInstance.title = `Delete School DocumentCode`;
    this.modalRef.componentInstance.buttonLabel = `Delete School DocumentCode`;
    this.modalRef.componentInstance.body = `Do you want to  Delete this School DocumentCode?`;
    this.modalRef.result.then((result) => {
      console.log("here is the result");
      console.log(result);
      if (result?.status === 'success') {
        const model = {
          id: row.id,
          remark: result?.remark
        };

        let suspendAgent = this.httpService
            .postReq("portal/api/v1/ag-settings/DocumentCode/delete", model)
            .subscribe({
              next: (resp) => {
                if (resp["status"] === 0) {
                  this.toastr.success(resp?.message ,'Sucsess');
                  this.getIndividualData();
                } else {
                  this.toastr.error(resp?.message,'Error');
                }
              }, error: (error) => {
                // Handle the error here
                this.loading = false;
                this.toastr.error(error["statusText"] || error["message"] || error.error["message"]);
              },
            });

        this.subs.push(suspendAgent);
      }

    })
  }

  
  }


