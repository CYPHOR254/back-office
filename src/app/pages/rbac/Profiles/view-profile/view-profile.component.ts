import {Component, Input, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ColumnMode, id} from '@swimlane/ngx-datatable';
import {catchError, map, Observable, Subscription, throwError} from "rxjs";
import { HttpServService } from 'src/app/shared/services/http-serv.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  rows: any = [];
  loading = true;
  reorderable = true;

   columns = [
    {name: 'ID', prop: 'frontendId'},
    {name: 'name', prop: 'name'},
    {name: 'remarks', prop: 'remarks'},


    ];

  
    @Input() formData: any;
    public form!: FormGroup;
  
    ColumnMode = ColumnMode;
    public currentUser:any;
    public imageFile!: File;
    public modalRef!: NgbModalRef;
    public profileId!: number;
  
  
    public profileDetails: any;
    public resetPassword$!: Observable<any>;
  
    subs: Subscription[] = [];
    total: any;
  
  
    constructor(
      private httpService: HttpServService,
      public activatedRoute: ActivatedRoute,
      private modalService: NgbModal,
      public fb: FormBuilder,
      public router: Router,
    ) {
  
    }
  
    ngOnInit(): void {
  
  
      this.activatedRoute.params.subscribe(params => {
        if (typeof params['id'] !== 'undefined') {
          this.profileId = params['id'];
        }
      });
  
      this.loadData();
  
    

    }
  
    private loadData(): any {
  
      this.loading = true;
  
  
  
      let loadProfileDetails = this.httpService
        .getReq(`portal/api/v1/rbac/view-profile/${this.profileId}`)
        .subscribe((res: any) => {
          if (res.status === 0) {
            console.log(res );
            
            this.loading = false;
              this.profileDetails = res.data;
          } else {
  
          }
        }, (error: any) => {
        });
  
      this.subs.push(loadProfileDetails);
  
    }
  
 
  
  
  
    ngOnDestroy(): void {
      this.subs.forEach(sub => sub.unsubscribe())
    }
  
  }
  