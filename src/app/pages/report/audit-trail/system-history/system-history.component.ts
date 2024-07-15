import {Component,  OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {catchError, map, Observable,  of, Subscription,  TimeoutError} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import { HttpServService } from 'src/app/shared/services/http-serv.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-system-history',
  templateUrl: './system-history.component.html',
  styleUrls: ['./system-history.component.scss']
})
export class SystemHistoryComponent implements OnInit {
  loading: boolean = true;
  rows: any = [];
  filteredRows: any = [];
  defaultNavActiveId = 1;
  systemHistoryList$: Observable<any> = of([]);
  title: string = "Agent System Log History";
  actions = ["View"];
  totalRecords: number = 0;
  subs: Subscription[] = [];
  viewedSystemHistory: any;
  allRecords: any;
  pageSizeControl = new FormControl(50); 
  pageSizeOptions = [

    { value: 50, name: '50 items' },
    { value: 100, name: '100 items' },
    { value: 200, name: '200 items' },
    { value: 300, name: '300 items' },
    { value: 400, name: '400 items' },
    { value: 500, name: '500 items' },
    { value: 1000, name: '1000 items' },
    { value: 5000, name: '5000 items' },
    { value: 10000, name: '10000 items' },
    { value: 20000, name: '20000 items' },

    // { value: '', name: 'All items' }
  ];

  public modalRef!: NgbModalRef;

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
  
  constructor(
    private httpService: HttpServService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    this.subs.forEach((sb) => sb.unsubscribe());
  }

  ngOnInit() {
    this. pageSizeControl.valueChanges?.subscribe((val:any)=>{
      console.log(val);
      
       if(val){this.getIndividualData();
         
   
       }});
    this.getIndividualData();
  }

  getIndividualData(): void {
    this.loading = true;

    const model = {
    
      page: 0,
      size:this.pageSizeControl.value,
      
        };

    this.systemHistoryList$ = this.httpService
    .postReq("portal/api/v1/audit/system/getall", model)
      .pipe(
        map((resp: any) => {
          if (resp["status"] === 0) {
            let response = resp["data"];

            this.rows = response.map((item: any, index: any) => {
              const myDate = item["createdOn"]?.split(" ")[0];
            let dateObj = new Date(myDate)?.toString().split("GMT")[0];
            dateObj = dateObj.replace(" 03:00:00", "");

              const res = { ...item, 
                frontendId: index + 1 , createdOn: dateObj};
  
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
      this.viewedSystemHistory = eventData["row"]["id"];
      this.router.navigate([`/audit-trail/all-login-history/${this.viewedSystemHistory}`]);
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
    
    this.systemHistoryList$ = of(filteredData);
    
  }

  
  searchResultByDate(event: any) {

    const filteredData = this.allRecords.filter((item:any) => {
      const createdOnDate = new Date(item.createdOn);
      return createdOnDate >= event?.startDate && createdOnDate <= event?.endDate;
    });
    
    this.systemHistoryList$ = of(filteredData);
    
  }





  }

