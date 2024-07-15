import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-edit-school-type",
  templateUrl: "./edit-school-type.component.html",
  styleUrls: ["./edit-school-type.component.scss"],
})
export class EditSchoolTypeComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;

  isLoading?: boolean;
  subs: Subscription[] = [];
  profileId: any;

  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public httpService: HttpServService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.formData ? this.formData.name : "", [Validators.required]],
    });
    console.log(this.formData);
  }

  public submitData(): void {
    if (this.formData) {
      this.editSchoolType();
    } 
    this.loading = true;
  }

  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }

  private editSchoolType(): any {
    console.log("this.form");
    console.log(this.form);
    this.isLoading = true;
    const model = {
      id: this.formData.id,
      name: this.form.value.name,
    };
    this.httpService
      .postReq("portal/api/v1/ag-settings/schooltype/update", model)
      .subscribe((result: any) => {
        if (result.status === 0) {
          this.isLoading = false;
          this.activeModal.close("success");
          this.toastr.success(result?.message, "Success");
          console.log(result);
        } else {
          this.activeModal.close("error");
          this.toastr.error(result?.message, "Error");
        }
      });
  }
}
