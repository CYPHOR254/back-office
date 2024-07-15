import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpServService} from "../../services/http-serv.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-open-doc-dialog',
    templateUrl: './access-offer-terms-dialog.component.html',
    styleUrls: ['./access-offer-terms-dialog.component.scss']
})
export class AccessOfferTermsDialogComponent implements OnInit {

    @Input() title: any;
    @Input() body: any;

    username: any;

    public errorMessages: any;
    public activeModal: any;
    public form!: FormGroup;

    constructor(
        activeModal: NgbActiveModal,
        public fb: FormBuilder,
        public toastr: ToastrService,
        public httpService: HttpServService,
    ) {
        this.activeModal = activeModal;
    }

    ngOnInit() {
      this.form = this.fb.group({
        acceptTerms: ['', [Validators.required]],
      });
    }

    close() {
        this.activeModal.close();
    }

    submitData() {
      this.acceptTermsAndConditions();
        this.activeModal.close('success');
    }

  private acceptTermsAndConditions() {
    const model = {
      id: this.body?.invoice?.id
    };

    let approveCustomer = this.httpService
      .postReq("api/v1/invoice/acceptTerms", model)
      .subscribe({
        next: (resp) => {
          if (resp["status"] === 200) {
            this.toastr.success("A Pin has been sent to your email. Use it to verify", "PIN SENT");
          } else {
            this.toastr.error("A pin could not be sent to your email. Please try again", "PIN FAIL");
          }
        }, error: (error) => {
          // Handle the error here
          this.toastr.error(error["statusText"] || error["message"] || error.error["message"], "Pin not sent");
        },
      });

  }
}
