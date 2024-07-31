import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ApiService } from "src/app/api.service";


@Component({
  selector: 'app-view-school',
  templateUrl: './view-school.component.html',
  styleUrls: ['./view-school.component.scss']
})
export class ViewSchoolComponent implements OnInit {
  @Input() schoolId : any 
  @Input() menuCodeId : any 

    //  schoolId!: any;
  activeTab: number | undefined;
  activeId = 1;
  loading : boolean = false 
  schoolDetails: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    // private httpService: HttpServService,
    private apiService : ApiService,
    private toastr: ToastrService,

  ) {}
  
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.schoolId = params["id"];
      }
      this.getSchoolDetails();
    });
  }

getSchoolDetails(): void {
    this.loading = true;
    this.apiService.getSchoolById(this.schoolId)
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response.statusCode === 200) {
            this.schoolDetails = response.result;
            console.log("Fetched school details:", this.schoolDetails);  // Debugging
            // this.getMenuStatus(this.schoolDetails?.menuCodeId);
          } else {
            this.toastr.error('Failed to fetch school details:', response.message);
          }
        },
        (error: any) => {
          this.loading = false;
          this.toastr.error('Error fetching school details:', error.message);
        }
      );
  }


}