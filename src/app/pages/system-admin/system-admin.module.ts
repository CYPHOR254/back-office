import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSystemAdminComponent } from './add-system-admin/add-system-admin.component';
import { ListSystemAdminsComponent } from './list-system-admins/list-system-admins.component';
import { EditSystemAdminComponent } from './edit-system-admin/edit-system-admin.component';
import { ViewSystemAdminComponent } from './view-system-admin/view-system-admin.component';
import { RouterModule, Routes } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgbAlert, NgbCollapse, NgbModule, NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet, NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  AsyncPipe,
  NgForOf,
  NgIf,
  TitleCasePipe,
  UpperCasePipe,
} from "@angular/common";
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralModule } from 'src/app/shared/components/general/general.module';
// import { SchoolCurriculumsComponent } from '../school-curriculums/school-curriculums.component';

const SystemAdminRoutes: Routes = [
  {
    path: "list-admins",
    component: ListSystemAdminsComponent,
  },
  {
    path: "add-agent",
    component: AddSystemAdminComponent,
  },
  {
    path: "view-agent/:id",
    component: ViewSystemAdminComponent,
    children: [
      // { path: "", component: AgentDetailsComponent },
      // { path: "", component: ListSchoolsComponent },
      // { path: "view-school", component: ViewSchoolComponent },
      // { path: "agent-system-log", component: AgentSystemLogsComponent },
      // { path: "login-history", component: AgentLoginHistoryComponent },
    ],
  },
  {
    path: "edit-agent/:id",
    component: EditSystemAdminComponent,
  },
  // {
  //   path: "School curriculum",
  //   component: SchoolCurriculumsComponent,
  // },
];
@NgModule({
  declarations: [
    AddSystemAdminComponent,
    ListSystemAdminsComponent,
    EditSystemAdminComponent,
    ViewSystemAdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SystemAdminRoutes),
    GeneralModule,
    NgbProgressbar,
    ReactiveFormsModule,
    ProgressbarModule,
    NgbCollapse,
    NgbNav,
    NgbNavItem,
    NgbNavOutlet,
    NgbModule,
    NgbNavLink,
    NgbNavOutlet,
    NgxOtpInputModule,
    TabsModule,
    MatTabsModule,
    CommonModule,
    ReactiveFormsModule,
    CommonModule,
    NgxDatatableModule,

    NgSelectModule,
    AsyncPipe,
    ReactiveFormsModule,
    NgbNavOutlet,
    NgbNavItem,
    NgbNav,
    NgbNavContent,
    UpperCasePipe,
    NgbCollapse,
    GeneralModule,
    TitleCasePipe,
    NgbProgressbar,
    NgbAlert,
    NgIf,
    NgbNavLink,
    NgForOf,
 
  ]
})
export class SystemAdminModule {}
