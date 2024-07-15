import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { HttpServService } from "../../../../shared/services/http-serv.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.scss"],
})
export class AddRoleComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;

  isLoading!: boolean;

  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addRole$!: Subscription;

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
      remarks: [
        this.formData ? this.formData.remarks : "",
        [Validators.required],
      ],
      isSystemRole: [
        this.formData ? this.formData.isSystemRole : "",
        [Validators.nullValidator],
      ],
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
      remarks: this.form.value.remarks,
      isSystemRole: true,
    };
    this.addRole$ = this._httpService
      .postReq("portal/api/v1/roles/save", model)
      .subscribe((result: any) => {
        if (result.status === 0) {
          this.isLoading = false;
          this.activeModal.close("success");
          this.toastr.success(result?.message, "Success");
        } else {
          this.activeModal.close("error");
          this.toastr.error(result?.message, "Success");
        }
      });
  }
}
