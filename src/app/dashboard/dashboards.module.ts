import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GeneralModule} from 'src/app/shared/components/general/general.module';
import {NgbDropdownModule, NgbProgressbar} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

const dashboardRoutes: Routes = [{
  path: '', redirectTo: 'admin-dashboard', pathMatch: 'full',
}, 
{
  path: 'admin-dashboard', component: AdminDashboardComponent
},
]
@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(dashboardRoutes), GeneralModule, NgbDropdownModule, NgbProgressbar, ReactiveFormsModule, NgApexchartsModule, FormsModule, BsDatepickerModule],
})
export class DashboardsModule {
}
