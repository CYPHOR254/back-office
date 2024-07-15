import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public userId!: any;
  activeTab: number | undefined;
  activeId = 1;
  profile: any;
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
    this.profile = localStorage.getItem("profile");
    this.userId = localStorage.getItem('id');
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
