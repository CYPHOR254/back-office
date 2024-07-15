import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GeneralModule } from 'src/app/shared/components/general/general.module';
import {
  NgbCollapse,
  NgbNav,
  NgbNavContent,
  NgbNavItem,
  NgbNavLink,
  NgbNavOutlet,
  NgbPopover,
  NgbProgressbar,
} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AgentsComponent } from './agents/agents.component';
import { AdminsComponent } from './admins/admins.component';
import { PartnersComponent } from './partners/partners.component';
import { SchoolsComponent } from './schools/schools.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatTabsModule } from '@angular/material/tabs';
import { ApprovedSchoolsComponent } from './schools/approved-schools/approved-schools.component';
import { ClarificationSchoolsComponent } from './schools/clarification-schools/clarification-schools.component';
import { AllSchoolsComponent } from './schools/all-schools/all-schools.component';
import { PendingSchoolsComponent } from './schools/pending-schools/pending-schools.component';
import { RejectedSchoolsComponent } from './schools/rejected-schools/rejected-schools.component';
import { SubmittedSchoolsComponent } from './schools/submitted-schools/submitted-schools.component';

const reportRoutes: Routes = [
  
  
    
      {path: '',component: AgentsComponent},  
      { path: 'admins',component: AdminsComponent},
      { path: 'partners', component: PartnersComponent },
      {
        path: 'audit-trail',
        loadChildren: () =>
          import('./audit-trail/audit-trail.module').then((m) => m.AuditTrailModule),
      },
      {path: 'schools',component:SchoolsComponent,
      children:[
             {path:'',component:AllSchoolsComponent},
             {path:'list-schools',component:AllSchoolsComponent},
             {path:'submitted-schools',component:SubmittedSchoolsComponent},
            {path:'all-schools',component:AllSchoolsComponent},
            {path:'pending-schools',component:PendingSchoolsComponent},
            {path:'approved-schools',component:ApprovedSchoolsComponent},
            {path:'rejected-schools',component:RejectedSchoolsComponent},
            {path:'clarification-schools',component:ClarificationSchoolsComponent},
                  ]

      }, 
]


@NgModule({
  declarations: [
   AgentsComponent,
   PartnersComponent,
   SchoolsComponent,
   AdminsComponent,
   ApprovedSchoolsComponent,
   ClarificationSchoolsComponent,
   AllSchoolsComponent,
   PendingSchoolsComponent,
   RejectedSchoolsComponent,
   SubmittedSchoolsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(reportRoutes),
    GeneralModule,
    NgbProgressbar,
    ReactiveFormsModule,
    NgbNavOutlet,
    NgbNavItem,
    NgbNav,
    NgbPopover,
    NgxDatatableModule,
    ProgressbarModule,  
    NgbNavLink,
    NgbNavContent,
    NgxOtpInputModule,
    TabsModule,
    MatTabsModule,
    NgbCollapse,
  


   



  ],
})
export class ReportModule {

}
