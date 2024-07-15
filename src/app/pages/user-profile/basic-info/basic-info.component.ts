import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
  @Input() userId:number|undefined;
  activeTab: number | undefined;    
  activeId = 1;
  public userDetails: any;
  public loading = false;
  private subs: any[] = [];
 
  

  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    private httpService: HttpServService  
  ) {}

  ngOnInit(): void {

    if (this.userId) {
      this.loadData();
    }

  }

  private loadData(): void {
    this.loading = true;
    const loadUserDetails = this.httpService
      .getReq(`portal/api/v1/systemuser/view/${this.userId}`)
      .subscribe(
        (res: any) => {
          this.loading = false;
          if (res.status === 0) {
            this.userDetails = res.data;
          } else {
            console.error('Error fetching user details', res.message);
          }
        },
        (error: any) => {
          this.loading = false;
          console.error('Error fetching user details', error);
        }
      );
    this.subs.push(loadUserDetails);
  }
  getFullName(firstName: any, lastName: any) {
    let fullname: string = `${firstName} ${lastName}`;
    fullname.toUpperCase();
    fullname = fullname.slice(0, 16);
    return fullname;
  }
}
