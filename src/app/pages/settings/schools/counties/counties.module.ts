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
import { CountiesComponent } from "./counties.component";
import { ListCountiesComponent } from "./list-counties/list-counties.component";
import { ListSubcountiesComponent } from "./list-subcounties/list-subcounties.component";
import { ViewSubcountiesbycountyComponent } from "./view-subcountiesbycounty/view-subcountiesbycounty.component";
import { ListDioceseComponent } from "../diocese/list-diocese/list-diocese.component";
import { ViewDioceseByCountyComponent } from "../diocese/view-diocese-by-county/view-diocese-by-county.component";

const countiesRoutes: Routes = [
  {
    path: "",
    component: CountiesComponent,
    children: [
      { path: "", component: ListCountiesComponent },
      { path: "list-counties", component: ListCountiesComponent },
      { path: "list-diocese", component: ListDioceseComponent },
      { path: "list-subcounties", component: ListSubcountiesComponent },
      {
        path: "view-subcounties/:id",
        component: ViewSubcountiesbycountyComponent,
      },
      { path: "view-diocese/:id", component: ViewDioceseByCountyComponent },
    ],
  },
];
@NgModule({
  declarations: [
    ListCountiesComponent,
    ListSubcountiesComponent,
    ViewSubcountiesbycountyComponent,
    CountiesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(countiesRoutes),
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
export class CountiesModule {}
