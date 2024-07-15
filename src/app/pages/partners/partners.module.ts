import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { GeneralModule } from "src/app/shared/components/general/general.module";
import {
  NgbCollapse,
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLink,
  NgbNavOutlet,
  NgbProgressbar,
} from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { NgxOtpInputModule } from "ngx-otp-input";
import { TabsModule } from "ngx-bootstrap/tabs";
import { MatTabsModule } from "@angular/material/tabs";
import { ListPartnersComponent } from "./list-partners/list-partners.component";
import { AddPartnerComponent } from "./add-partner/add-partner.component";
import { ViewPartnerComponent } from "./view-partner/view-partner.component";
import { EditPartnerComponent } from "./edit-partner/edit-partner.component";
import { PartnerSystemLogsComponent } from "./view-partner/partner-system-logs/partner-system-logs.component";
import { PartnerLoginHistoryComponent } from "./view-partner/partner-login-history/partner-login-history.component";
import { PartnerDetailsComponent } from "./view-partner/partner-details/partner-details.component";
import { ApprovedSchoolsComponent } from './view-partner/approved-schools/approved-schools.component';
import { RejectedSchoolsComponent } from './view-partner/rejected-schools/rejected-schools.component';
import { ClarificationSchoolsComponent } from './view-partner/clarification-schools/clarification-schools.component';

const customerRoutes: Routes = [
  {
    path: "list-partners",
    component: ListPartnersComponent,
  },
  {
    path: "edit-partner",
    component: EditPartnerComponent,
  },
  {
    path: "view-partner/:id",
    component: ViewPartnerComponent,
  },
];

@NgModule({
  declarations: [
    ListPartnersComponent,
    AddPartnerComponent,
    ViewPartnerComponent,
    EditPartnerComponent,
    PartnerSystemLogsComponent,
    PartnerLoginHistoryComponent,
    PartnerDetailsComponent,
    ApprovedSchoolsComponent,
    RejectedSchoolsComponent,
    ClarificationSchoolsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    GeneralModule,
    NgbProgressbar,
    ReactiveFormsModule,
    ProgressbarModule,
    NgbCollapse,
    NgbNav,
    NgbNavItem,
    NgbNavOutlet,
    NgbNavLink,
    NgbNavContent,
    NgxOtpInputModule,
    TabsModule,
    MatTabsModule,
  ],
})
export class PartnersModule {}
