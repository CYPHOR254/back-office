import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-view-system-user",
  templateUrl: "./view-system-user.component.html",
  styleUrls: ["./view-system-user.component.scss"],
})
export class ViewSystemUserComponent implements OnInit{
  public systemUserId!: any;
  activeTab: number | undefined;
  activeId = 1;
  loading = true;
  public systemUserDetails: any;
  profile: string|undefined;
  
  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    private httpService: HttpServService,
  
  ) {

  }
  ngOnInit(): void {
  
  
    this.activatedRoute.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.systemUserId = params['id'];
      }
      this.loadData()
    });


  

  }
  
  private loadData(): void {
    this.loading = true;
     this.httpService
      .getReq(`portal/api/v1/systemuser/view/${this.systemUserId}`)
      .subscribe(
        (res: any) => {
          if (res.status === 0) {
            this.loading = false;
            this.systemUserDetails = res.data;
            this.profile=res.data.profile
            console.log(this.profile);
            
          } else {
            this.loading = false;
          }
        },
        (error: any) => {
          this.loading = false;
        }
      );
  }
}
