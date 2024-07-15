import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import {
  catchError,
  map,
  Observable,
  of,
  Subscription,
  throwError,
  TimeoutError,
} from "rxjs";
import { HttpServService } from "src/app/shared/services/http-serv.service";

@Component({
  selector: "app-edit-role",
  templateUrl: "./edit-role.component.html",
  styleUrls: ["./edit-role.component.scss"],
})
export class EditRoleComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;

  isLoading?: boolean;
  subs: Subscription[] = [];
  profileId: any;

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
      remarks: [
        this.formData ? this.formData.remarks : "",
        [Validators.required],
      ],
      isSystemRole: [
        this.formData ? this.formData.isSystemRole : "",
        [Validators.nullValidator],
      ],
    });
    console.log(this.formData);
  }

  public submitData(): void {
    this.editRole();

    this.loading = true;
  }

  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }

  private editRole(): any {
    console.log("this.form");
    console.log(this.form);
    this.isLoading = true;

    let model = {
      id: this.formData.id,
      name: this.form.value.name,
      remarks: this.form.value.remarks,
      isSystemRole: true,
    };

    this.httpService
      .postReq("portal/api/v1/roles/update", model)
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
