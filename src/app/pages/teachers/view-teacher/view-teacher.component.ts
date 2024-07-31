import { Component, Input, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "src/app/api.service";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-view-teacher',
  templateUrl: './view-teacher.component.html',
  styleUrls: ['./view-teacher.component.scss']
})
export class ViewTeacherComponent implements OnInit {
  public teacherId!: any;
  activeTab: number | undefined;
  activeId = 1;
  loading = true;
  public teachersDetails: any;


  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    private apiService: ApiService, // Adjust based on your actual service implementation
    private toastr: ToastrService,

  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.teacherId = params["id"];
      }
    });
  }
  getTeachersDetails(): void {
    this.loading = true;
    this.apiService.getTeacherById(this.teacherId)
      .subscribe(
        (response: any) => {
          this.loading = false;
          if (response.statusCode === 200) {
            if (response.result) {
              this.teachersDetails = response.result;
              console.log("Fetched single teacher details:", this.teachersDetails);  // Debugging
              // this.getMenuStatus(this.teachersDetails?.menuCodeId);
            } else {
              this.toastr.warning('No teacher details found', 'Warning');
              console.log('No records found:', response);
            }
          } else {
            this.toastr.error('Failed to fetch teachers details:', response.statusMessage);
            console.error('Failed response:', response);
          }
        },
        (error: any) => {
          this.loading = false;
          this.toastr.error('Error fetching teachers details:', error.message);
          console.error('Error fetching teachers details:', error);
        }
      );
  }
}