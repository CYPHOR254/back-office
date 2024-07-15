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
import { SettingsComponent } from "./settings/settings.component";

const settingsRoutes: Routes = [
  {
    path: "schools",
    loadChildren: () =>
      import("./schools/schools.module").then((m) => m.SchoolsModule),
  },
  {
    path: "documents",
    loadChildren: () =>
      import("./schools/documents/documents.modules").then(
        (m) => m.DocumentsModule
      ),
  },
  {
    path: "counties",
    loadChildren: () =>
      import("./schools/counties/counties.module").then(
        (m) => m.CountiesModule
      ),
  },
  {
    path: "passwords",
    loadChildren: () =>
      import("./schools/manage-unauthorized-passwords/manage-password.module").then(
        (m) => m.passwordsModule
      ),
  },
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(settingsRoutes),
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
export class SettingsModule {}
