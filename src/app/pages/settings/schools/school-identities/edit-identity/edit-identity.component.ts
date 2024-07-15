import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-edit-identity",
  templateUrl: "./edit-identity.component.html",
  styleUrls: ["./edit-identity.component.scss"],
})
export class EditIdentityComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;

  isLoading?: boolean;
  subs: Subscription[] = [];

  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public imageFile?: File;

  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    public httpService: HttpServService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.formData ? this.formData.name : "", [Validators.required]],
      code: [this.formData ? this.formData.code : "", [Validators.required]],
    });
  }

  public submitData(): void {
    if (this.formData) {
      this.editIdentity();
    } 
    this.loading = true;
  }

  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }

  private editIdentity(): any {
    console.log("this.form");
    console.log(this.form);

    this.isLoading = true;
    const model = {
      id: this.formData.id,
      name: this.form.value.name,
      code: this.form.value.code,
    };

    this.httpService
      .postReq("portal/api/v1/coremaster/identity/types/update", model)
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
