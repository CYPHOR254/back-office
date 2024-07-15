import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { HttpServService } from "src/app/shared/services/http-serv.service";
import * as bootstrap from "bootstrap";

@Component({
  selector: "app-agent-role",
  templateUrl: "./add-agent.component.html",
  styleUrls: ["./add-agent.component.scss"],
})
export class AddAgentComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;

  isLoading!: boolean;
  
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public addAgent$!: Subscription;


  constructor(
    public activeModal: NgbActiveModal,
    public fb: FormBuilder,
    public toastr: ToastrService,
    private _httpService: HttpServService
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
  }

  public submitData(): void {
    this.loading = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.loading = false;
      return;
    }
    this.createRecord();
  }



  private createRecord(): any {
    this.isLoading = true;
    const model = {
      firstName: this.form.value.firstName,
      middleName: this.form.value.middleName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phoneNumber: this.form.value.phoneNumber,
      idNumber: this.form.value.idNumber,
      channel: "APP",
    };

    this.addAgent$ = this._httpService
      .postReq("portal/api/v1/agents/save", model)
      .subscribe(
        (result: any) => {
          this.isLoading = false;
          if (result.status === 0) {
            this.activeModal.close("success");
            this.toastr.success(result?.message, "Success");
          } else {
            this.hasErrors = true;
            this.errorMessages = result?.message;
            this.toastr.error(result?.message, "Error");
          }
        },
        (error) => {
          this.isLoading = false;
          this.hasErrors = true;
          this.errorMessages = error?.message;
          this.toastr.error(error?.message, "Error");
        }
      );
  }
  closeModal(id: string): void {
    const modal = bootstrap.Modal.getInstance(document.getElementById(id)!);
    if (modal) {
      modal.hide();
    }
  }
}
