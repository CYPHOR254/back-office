import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { GeneralModule } from "src/app/shared/components/general/general.module";
import {
  NgbCollapse,
  NgbNav,
  NgbNavItem,
  NgbNavOutlet,
  NgbPopover,
  NgbProgressbar,
} from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { OwnLoginHistoryComponent } from "./own-login-history/own-login-history.component";
import { AllLoginHistoryComponent } from "./all-login-history/all-login-history.component";
import { AuditTrailComponent } from "./audit-trail.component";
import { SystemHistoryComponent } from './system-history/system-history.component';

const auditTrailRoutes: Routes = [
  {
    path: "",component:AuditTrailComponent,
    
    children: [
    { path: "", component: AllLoginHistoryComponent },

      { path: "own-login-history", component: OwnLoginHistoryComponent },
      { path: "system-history", component:SystemHistoryComponent },

    ],
  },
];

@NgModule({
  declarations: [
    OwnLoginHistoryComponent,
    AllLoginHistoryComponent,
    AuditTrailComponent,
    SystemHistoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(auditTrailRoutes),
    GeneralModule,
    NgbProgressbar,
    ReactiveFormsModule,
    NgbNavOutlet,
    NgbNavItem,
    NgbNav,
    NgbCollapse,
    NgbPopover,
    NgxDatatableModule,
  ],
})
export class AuditTrailModule {}
