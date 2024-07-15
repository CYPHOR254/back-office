import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-add-school-gender",
  templateUrl: "./add-school-gender.component.html",
  styleUrls: ["./add-school-gender.component.scss"],
})
export class AddSchoolGenderComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;

  isLoading!: boolean;

  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addSchoolGender$!: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private _httpService: HttpServService
  ) {}
  ngOnInit() {
    console.log("this.formData");
    console.log(this);
    this.form = this.fb.group({
      name: [this.formData ? this.formData.name : "", [Validators.required]],
    });
  }
  public submitData(): void {
    if (this.formData) {
      this.createRecord();
    }
    this.loading = true;
  }
  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }
  private createRecord(): any {
    this.isLoading = true;
    let model = {
      name: this.form.value.name,
    };
    this.addSchoolGender$ = this._httpService
      .postReq("portal/api/v1/ag-settings/schoolgender/save", model)
      .subscribe((result: any) => {
        if (result.status === 0) {
          this.isLoading = false;
          this.activeModal.close("success");
          this.toastr.success(result?.message, "Success");
        } else {
          this.activeModal.close("error");
          this.toastr.error(result?.message, "Error");
        }
      });
  }


}
