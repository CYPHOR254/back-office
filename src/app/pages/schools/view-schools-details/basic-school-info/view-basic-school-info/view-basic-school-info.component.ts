import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "src/app/api.service";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import { PartnerActionDialogComponent } from "src/app/shared/components/partner-action-dialog/partner-action-dialog.component";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: "app-view-basic-school-info",
  templateUrl: "./view-basic-school-info.component.html",
  styleUrls: ["./view-basic-school-info.component.scss"],
})
export class ViewBasicSchoolInfoComponent implements OnInit {
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
    this.getSchoolDetails();
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.schoolId = params["id"];
      }
    });
  }

// getSchoolDetails(): void {
  
//     this.loading = true;
//     this.apiService.getSchoolById(this.schoolId)
//       .subscribe(
//         (response: any) => {
//           this.loading = false;
//           if (response.statusCode === 200) {
//             this.schoolDetails = response.result;
//             console.log("Fetched school details:", this.schoolDetails);  // Debugging
//             console.log(response,'fetched school basicdetails  ');

//             // this.getMenuStatus(this.schoolDetails?.menuCodeId);
//           } else {
//             this.toastr.error('Failed to fetch school details:', response.message);
//           }
//         },
//         (error: any) => {
//           this.loading = false;
//           this.toastr.error('Error fetching school details:', error.message);
//         }
//       );
//   }

// ngOnInit(): void {
//   this.getSchoolDetails();
// }

getSchoolDetails(): void {
  if (!this.schoolId) {
    console.error("schoolId is undefined");
    return;
  }
  this.loading = true;
  this.apiService.getSchoolById(this.schoolId).subscribe(
    (response: any) => {
      this.loading = false;
      if (response.statusCode === 200) {
        this.schoolDetails = response.result;
        console.log("Fetched school details:", this.schoolDetails);
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