import {Component,  OnInit} from '@angular/core';
import { NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map, Observable,  of, Subscription,  TimeoutError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-sytem-user-audit-trail',
  templateUrl: './sytem-user-audit-trail.component.html',
  styleUrls: ['./sytem-user-audit-trail.component.scss']
})
export class SytemUserAuditTrailComponent implements OnInit {
  public modalRef!: NgbModalRef;
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;

  columns = [
    {name: 'User', prop: 'user'},
    {name: 'Action', prop: 'action'},
    {name: 'Host', prop: 'host'},
    {name: 'Details', prop: 'details'},
    {name: 'Ip', prop: 'ip'},
    {name: 'Host', prop: 'host'},
    {name: 'Description', prop: 'actionDescription'},


  ];

  allColumns = [...this.columns];
  loginHistoryList$: Observable<any> = of([]);
  title: string = "Login History";
  totalRecords: number = 0;
  subs: Subscription[] = [];
  public userId!: number;

  viewedloginHistory: any;
  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService,
    public activatedRoute: ActivatedRoute,

  ) {}
  systemUserAuditTrail$: Observable<any> = of([]);


  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params['id'] !== 'undefined') {
        this.userId = params['id'];
      }
    });
    this.getIndividualSystemUserAuditTrail();
  }


  getIndividualSystemUserAuditTrail() {
    this.loading = true;
    const model = {
      id: this.userId,
    };
    this.systemUserAuditTrail$ = this.httpService
      .postReq('', model)
      .pipe(
        map((resp: any) => {
          if (resp['status'] === 0) {
            let response = resp['data'];
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
            this.toastr.error(error['message'], 'API Timeout');
          } else {
            this.toastr.error(
              error['statusText'] || error['message'],
              'Data Not Fetched'
            );
          }
          return of([]);
        })
      );

  }

  updateColumns(updatedColumns: any) {
    this.columns = [...updatedColumns];
  }

 





  





  }

