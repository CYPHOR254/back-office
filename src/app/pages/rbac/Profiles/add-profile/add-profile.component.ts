import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { catchError, map, Observable, Subscription } from "rxjs";
import { HttpServService } from "../../../../shared/services/http-serv.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-profile",
  templateUrl: "./add-profile.component.html",
  styleUrls: ["./add-profile.component.scss"],
})
export class AddProfileComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addProfile$!: Subscription;

  isLoading!: boolean;
  profilesList: any;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private _httpService: HttpServService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ["", Validators.required],
      remarks: ["", Validators.required]
    });

    this.getProfiles();
  }

  public submitData(): void {
    if (this.form.valid) {
      this.createRecord();
    } else {
      this.form.markAllAsTouched();
      this.toastr.error('Please fill in all required fields', 'Validation Error');
    }
  }
  // public submitData(): void {
  //   if (this.formData) {
  //     this.createRecord();
  //   }
  //   this.loading = true;
  // }

  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }

  

  getProfiles(): void {
    this.loading = true;

    let model = null;

    this._httpService
      .postReq("portal/api/v1/profiles/get/dropdown/option", model)
      .subscribe((response: any) => {
        if (response.status === 0) {
          this.profilesList = response.data; 
          console.log(this.profilesList, 'This is what u are giving me');
          
        } else {
          this.toastr.error(response.message, "Error");
        }
      });
  }
  private createRecord(): void {
    this.isLoading = true;
    const model = {
      name: this.form.value.name,
      remarks: this.form.value.remarks,
    };
    
    this.addProfile$ = this._httpService.postReq('portal/api/v1/profiles/save', model)
      .subscribe(
        (result: any) => {
          this.isLoading = false;
          if (result.status === 0) {
            this.activeModal.close('success');
            this.toastr.success(result.message, 'Success');
          } else {
            this.activeModal.close('error');
            this.toastr.error(result.message, 'Error');
          }
        },
        (error: any) => {
          this.isLoading = false;
          this.toastr.error('An error occurred while creating the record', 'Error');
        }
      );
  }
}
