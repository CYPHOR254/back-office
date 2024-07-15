import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-add-school-categories",
  templateUrl: "./add-school-categories.component.html",
  styleUrls: ["./add-school-categories.component.scss"],
})
export class AddSchoolCategoriesComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;

  isLoading!: boolean;

  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addSchoolCategory$!: Subscription;

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
    this.loading = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loading = false;
      return;
    }

    if (this.formData) {
      this.saveChanges();
    } else {
      this.createRecord();
    }
  }
  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }
  private createRecord(): any {
    this.isLoading = true;
    let model = {
      name: this.form.value.name,
    };
    this.addSchoolCategory$ = this._httpService
      .postReq("portal/api/v1/ag-settings/categories/save", model)
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

  private saveChanges(): any {
    this.isLoading = true;
    const model = {
      name: this.form.value.name,
    };

    this._httpService
      .postReq("portal/api/v1/ag-settings/categories/update", model)
      .subscribe((result: any) => {
        if (result.status == 0) {
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
