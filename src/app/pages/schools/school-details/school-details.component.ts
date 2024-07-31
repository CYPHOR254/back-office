import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-school-details',
  templateUrl: './school-details.component.html',
  styleUrls: ['./school-details.component.scss']
})
export class SchoolDetailsComponent implements OnInit{
  
  schoolId: number | undefined ;
  activeId = 1;
  loading : boolean = false 



  constructor(
    public activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    public router: Router,
    private apiService : ApiService,
    private toastr: ToastrService,
   ) {}

  ngOnInit(): void {
  
    this.activatedRoute.params.subscribe((params) => {
      if (typeof params["id"] !== "undefined") {
        this.schoolId = params["id"];
      }
      // this.getSchoolDetails();
    });
  }
}
