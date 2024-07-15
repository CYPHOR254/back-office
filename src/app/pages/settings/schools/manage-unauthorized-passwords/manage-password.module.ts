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
import { ListPasswordsComponent } from "./list-passwords/list-passwords.component";

const passwordsRoutes: Routes = [
  {
    path: "",
    component: ListPasswordsComponent,
    children: [
      { path: "", component: ListPasswordsComponent },

    ],
  },
];
@NgModule({
  declarations: [
 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(passwordsRoutes),
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
export class passwordsModule {}
