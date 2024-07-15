import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "../../../shared/services/http-serv.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-partner",
  templateUrl: "./edit-partner.component.html",
  styleUrls: ["./edit-partner.component.scss"],
})
export class EditPartnerComponent implements OnInit {
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
      firstName: [
        this.formData ? this.formData.firstName : "",
        [Validators.required],
      ],
      lastName: [
        this.formData ? this.formData.lastName : "",
        [Validators.required],
      ],
      middleName: [
        this.formData ? this.formData.middleName : "",
        [Validators.required],
      ],
      email: [this.formData ? this.formData.email : "", [Validators.required]],
      phoneNumber: [
        this.formData ? this.formData.phoneNumber : "",
        [Validators.required],
      ],
      idNumber: [
        this.formData ? this.formData.idNumber : "",
        [Validators.required],
      ],
    });
    console.log(this.formData);
  }

  public submitData(): void {
    this.editPartner();
    this.loading = true;
  }

  public closeModal(): void {
    this.activeModal.dismiss("Cross click");
  }

  private editPartner(): any {
    console.log("this.form");
    console.log(this.form);

    this.isLoading = true;
    const model = {
      id: this.formData.id, 
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      idNumber: this.form.value.idNumber,
      channel: "PORTAL",
    };

    this.httpService
      .postReq("portal/api/v1/partners/update", model)
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
