import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-add-school-type",
  templateUrl: "./add-school-type.component.html",
  styleUrls: ["./add-school-type.component.scss"],
})
export class AddSchoolTypeComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;

  isLoading!: boolean;

  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addSchoolType$!: Subscription;

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
    this.createRecord();

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
    this.addSchoolType$ = this._httpService
      .postReq("portal/api/v1/ag-settings/schooltype/save", model)
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
