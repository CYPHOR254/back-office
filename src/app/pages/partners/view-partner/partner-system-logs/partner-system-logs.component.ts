import {Component, Input, OnInit} from '@angular/core';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {catchError, map, Observable, of, Subscription, TimeoutError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-partner-system-logs',
  templateUrl: './partner-system-logs.component.html',
  styleUrls: ['./partner-system-logs.component.scss']
})
export class PartnerSystemLogsComponent implements OnInit {
  public modalRef!: NgbModalRef;
  @Input () partnerId:any|undefined;
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  allRecords: any;

  columns = [
    {name: 'User', prop: 'user'},
    {name: 'Action', prop: 'action'},
    {name: 'Host', prop: 'host'},
    {name: 'Details', prop: 'details'},
    {name: 'Ip Address', prop: 'ip'},
    {name: 'Host', prop: 'host'},
    {name: 'Description', prop: 'actionDescription'},
    {name: 'Created On', prop: 'createdOn'},

  ];


  allColumns = [...this.columns];
  OwnLoginHistoryList$: Observable<any> = of([]);
  title: string = "User";
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  viewedHistory: any;
  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService,
    private router: Router,
    public activatedRoute: ActivatedRoute,

  ) {}

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.partnerId = params['id'];
        this.getIndividualData()
      }
    });
  }

  getIndividualData(page: number = 0, size: number = 100): void {
    this.loading = true;

    const model = {
      page: page,
      id: this.partnerId,
      size: size,
      
    };

    this.OwnLoginHistoryList$ = this.httpService
    .postReq("portal/api/v1/audit/login/history/getall/own", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            this.allRecords = resp['data'];
            let response = resp["data"];            
            console.log(response,'for login');
            

            this.rows = response.map((item: any, index: any) => {
              const myDate = item["createdOn"].split(" ")[0];
              let dateObj = new Date(myDate).toString().split("GMT")[0];
              dateObj = dateObj.replace(" 03:00:00", "");
  
              const res = { ...item, frontendId: index + 1, createdOn: dateObj };
  
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
      this.viewedHistory = eventData["row"]["id"];
      this.router.navigate([`/audit-trail/own-login-history/${this.viewedHistory}`]);
    } 
    
  
  }
  searchResultUniversal(event: any) {

    const filteredData = this.allRecords?.filter((item: any) => {
      
      return Object.values(item)?.some((value: any) => {
        let str = value + '';
        return str?.toLowerCase()?.includes(event?.toLowerCase())
      }
      )
    }
      
    );
    
    this.OwnLoginHistoryList$ = of(filteredData);
    
  }

  
  searchResultByDate(event: any) {

    const filteredData = this.allRecords.filter((item:any) => {
      const createdOnDate = new Date(item.createdOn);
      return createdOnDate >= event?.startDate && createdOnDate <= event?.endDate;
    });
    
    this.OwnLoginHistoryList$ = of(filteredData);
    
  }
  





  }


