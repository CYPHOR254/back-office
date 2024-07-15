import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {HttpServService} from "../../services/http-serv.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'edit-global-settings-modal',
  templateUrl: './edit-global-settings-modal.component.html',
  styleUrls: ['./edit-global-settings-modal.component.scss']
})
export class EditGlobalSettingsModalComponent implements OnInit {
  @Input() title: any;
  @Input() formData: any;
  @Input() action: any;
  @Input() buttonLabel: any;
  public loading = false;
  public hasErrors = false;
  public errorMessages: any;
  public form!: FormGroup;
  public imageFile!: File;
  isLoading: any;

  constructor(
      public activeModal: NgbActiveModal,
      public fb: FormBuilder,
      public toastr: ToastrService,
      private httpService: HttpServService) {
  }

  ngOnInit() {

      this.form = this.fb.group({
        interestRatePercentage: [this.formData?.interestRatePercentage, [Validators.required]],
        tenureDuration: [this.formData?.tenureDuration, [Validators.required]],
        discountingPercentage: [this.formData?.discountingPercentage, [Validators.required]],
        managementFeePercentage: [this.formData?.managementFeePercentage, [Validators.required]],
        invoiceAge: [this.formData?.invoiceAge, [Validators.required]],
        rollOverPeriod: [this.formData?.rollOverPeriod, [Validators.required]],
        defaultNotificationEmail: [this.formData?.defaultNotificationEmail, [Validators.required]],
      });

  }

  public closeModal(): void {
      this.activeModal.dismiss('Cross click');
  }

  editGlobalSettings() {

    const model = {
      interestRatePercentage : this.form.value.interestRatePercentage,
      tenureDuration : this.form.value.tenureDuration,
      discountingPercentage : this.form.value.discountingPercentage,
      managementFeePercentage : this.form.value.managementFeePercentage,
      invoiceAge : this.form.value.invoiceAge,
      rollOverPeriod : this.form.value.rollOverPeriod,
      defaultNotificationEmail : this.form.value.defaultNotificationEmail
    };

    let approveCustomer = this.httpService
      .postReq("api/v1/business/updateInvoiceSettings", model)
      .subscribe({
        next: (resp) => {
          if (resp["status"] === 200) {
            this.toastr.success(resp["message"], "Settings Updated");
            this.activeModal.close('success');
          } else {
            this.toastr.error(resp["message"], "Failed");
          }
        }, error: (error) => {
          // Handle the error here
          this.loading = false;
          this.toastr.error(error["statusText"] || error["message"] || error.error["message"], "Failed");
        },
      });



  }

}
