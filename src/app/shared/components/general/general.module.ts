import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomTblComponent } from "./custom-tbl/custom-tbl.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import {
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbPopover,
  NgbProgressbar,
  NgbTooltip,
} from "@ng-bootstrap/ng-bootstrap";
import { UserActionsModalComponent } from "../user-actions-modal/user-actions-modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { AddContactDetailModalComponent } from "../add-contact-detail-modal/add-contact-detail-modal.component";
import { CustomInvoiceHeaderComponent } from "./custom-invoice-header/custom-invoice-header.component";
import { NgxOtpInputModule } from "ngx-otp-input";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { AccessOfferTermsDialogComponent } from "../access-offer-terms-dialog/access-offer-terms-dialog.component";
import { EditGlobalSettingsModalComponent } from "../edit-global-settings-modal/edit-global-settings-modal.component";
import { ResetPasswordDialogComponent } from "../reset-password-dialog/reset-password-dialog.component";
import { PasswordInputComponent } from "./password-input/password-input.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CustomerActionsModalComponent } from "../customer-actions-modal/customer-actions-modal.component";
import { CustomTblHeaderComponent } from "./custom-tbl-header/ts";
import { AssignProfileDialogComponent } from "../assign-profile-dialog/assign-profile-dialog.component";
import { PartnerActionDialogComponent } from "../partner-action-dialog/partner-action-dialog.component";
@NgModule({
  declarations: [
    CustomTblComponent,
    CustomTblHeaderComponent,
    UserActionsModalComponent,
    ConfirmDialogComponent,
    ResetPasswordDialogComponent,
    CustomInvoiceHeaderComponent,
    AccessOfferTermsDialogComponent,
    EditGlobalSettingsModalComponent,
    AddContactDetailModalComponent,
    PasswordInputComponent,
    CustomerActionsModalComponent,
    AssignProfileDialogComponent,
    PartnerActionDialogComponent,

  ],
  imports: [
    BsDatepickerModule,
    CommonModule,
    NgxDatatableModule,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    NgbDropdownItem,
    NgbTooltip,
    ReactiveFormsModule,
    NgbPopover,
    NgxOtpInputModule,
    ProgressbarModule,
    NgbProgressbar,
    FormsModule,
  ],
  exports: [
    CustomTblComponent,
    CustomTblHeaderComponent,
    CustomInvoiceHeaderComponent,
    AccessOfferTermsDialogComponent,
    EditGlobalSettingsModalComponent,
    PasswordInputComponent,
  ],
})
export class GeneralModule {}
