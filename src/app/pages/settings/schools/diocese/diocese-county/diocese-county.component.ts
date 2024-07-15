import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, TimeoutError, catchError, map, of } from 'rxjs';
import { UserActionsModalComponent } from 'src/app/shared/components/user-actions-modal/user-actions-modal.component';
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-diocese-county',
  templateUrl: './diocese-county.component.html',
  styleUrls: ['./diocese-county.component.scss']
})
export class DioceseCountyComponent implements OnInit {
  public modalRef!: NgbModalRef;
  @Input() formData: any;
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  title: string = "Counties";
  actions = ["View Subcounties", "Edit","Delete"];
  totalRecords: number = 0;
  subs: Subscription[] = [];

  
  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService,
    private router:Router,
    private modalService: NgbModal,

    

  ) {}

  columns = [
    {name: 'ID', prop: 'frontendId'},
    {name: 'name', prop: 'name'},

  ];

  allColumns = [...this.columns];
  dioceseList$: Observable<any> = of([]);
  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.getIndividualData();
  
  }

  getIndividualData() {
    this.loading = true;
    const model = null;
    this.dioceseList$ = this.httpService
    .postReq("portal/api/v1/ag-settings/counties/getcountydiocese", model)
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
      this.rows = [
        {
  
        },
  
      ]
    }
  
    updateColumns(updatedColumns: any) {
      this.columns = [...updatedColumns];
    }
  
  
    updateFilteredRowsEvent(data: string) {
      this.filteredRows = data;
    }

    
    }
  
  
  