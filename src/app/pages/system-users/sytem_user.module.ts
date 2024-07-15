import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
  NgbCollapse,
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLink,
  NgbNavOutlet,
  NgbProgressbar,
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { EditSystemUserComponent } from './edit-system-user/edit-system-user.component';
import { ViewSystemUserComponent } from './view-system-user/view-system-user.component';
import { ListSystemUsersComponent } from './list-system-users/list-system-users.component';
import { SytemUserAuditTrailComponent } from './sytem-user-audit-trail/sytem-user-audit-trail.component';
import { SystemUsersComponent } from './system-users/system-users.component';
import { BlockedSystemUsersComponent } from './blocked-system-users/blocked-system-users.component';
import { SystemUserDetailsComponent } from './view-system-user/system-user-details/system-user-details.component';
import { SystemUserLoginHistoryComponent } from './view-system-user/system-user-login-history/system-user-login-history.component';
import { SystemUserSystemLogsComponent } from './view-system-user/system-user-system-logs/system-user-system-logs.component';
import { GeneralModule } from 'src/app/shared/components/general/general.module';
import { SchoolAddedComponent } from './school-added/school-added.component';
import { ApprovedSchoolsComponent } from './view-system-user/approved-schools/approved-schools.component';
import { RejectedSchoolsComponent } from './view-system-user/rejected-schools/rejected-schools.component';
import { ClarificationSchoolsComponent } from './view-system-user/clarification-schools/clarification-schools.component';
import { AddedSchoolsComponent } from './view-system-user/added-schools/added-schools.component';
import { AddSystemUserComponent } from './add-system-user/add-system-user.component';

const systemUsersRoutes: Routes = [
  {path: 'view-system-user/:id',
  component: ViewSystemUserComponent,
 },
  {path: 'all-system-users',component: SystemUsersComponent,
  children:[
    {
      path: '',component: ListSystemUsersComponent,
    },
    {
      path: 'blocked-system-users',component: BlockedSystemUsersComponent,
    },
    {
      path: 'add-system-users',
      component: AddSystemUserComponent,
    },
  
    {
      path: 'edit-system-user/:id',
      component: EditSystemUserComponent,
  
    },
 
  ]
  },
];

@NgModule({
  declarations: [
    EditSystemUserComponent,
    ViewSystemUserComponent,
    ListSystemUsersComponent,
    AddSystemUserComponent,
    SytemUserAuditTrailComponent,
    SystemUsersComponent,
    BlockedSystemUsersComponent,
    SystemUserDetailsComponent,
    SystemUserLoginHistoryComponent,
    SystemUserSystemLogsComponent,
    SchoolAddedComponent,
    ApprovedSchoolsComponent,
    RejectedSchoolsComponent,
    ClarificationSchoolsComponent,
    AddedSchoolsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild( systemUsersRoutes),
    NgbProgressbar,
    GeneralModule,
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
export class SystemUsersModule {}
