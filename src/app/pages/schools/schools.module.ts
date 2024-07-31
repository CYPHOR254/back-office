import { NgModule } from "@angular/core";
import { AsyncPipe, CommonModule, NgForOf, NgIf, TitleCasePipe, UpperCasePipe } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { GeneralModule } from "src/app/shared/components/general/general.module";
import {
  NgbAlert,
  NgbCollapse,
  NgbModule,
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
import { ViewSchoolsDetailsComponent } from "./view-schools-details/view-schools-details.component";
import { ViewBasicSchoolInfoComponent } from "./view-schools-details/basic-school-info/view-basic-school-info/view-basic-school-info.component";
import { ListContactInfoComponent } from "./view-schools-details/contact-info/list-contact-info/list-contact-info.component";
import { ListFinancialDocumentsComponent } from "./view-schools-details/documents/financial-documents/list-financial-documents/list-financial-documents.component";
import { ListSupportingDocumentsComponent } from "./view-schools-details/documents/supporting-documents/list-supporting-documents/list-supporting-documents.component";
import { ListSchoolDocumentsComponent } from "./view-schools-details/documents/school-documents/list-school-documents/list-school-documents.component";
import { ListDetailedSchoolProfileComponent } from "./view-schools-details/detailed-school-profile/list-detailed-school-profile/list-detailed-school-profile.component";
import { ListDirectorsComponent } from './view-schools-details/documents/directors-documents/list-directors/list-directors.component';
import { ViewContactInfoComponent } from './view-schools-details/contact-info/view-contact-info/view-contact-info.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";
import { ListSchoolsComponent } from "./list-schools/list-schools.component";
import { AddSchoolComponent } from './add-school/add-school.component';
import { EditSchoolComponent } from './edit-school/edit-school.component';
import { ViewSchoolComponent } from './view-school/view-school.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';

const customerRoutes: Routes = [
  {
    path: "list-schools",
    component: ListSchoolsComponent,
  },
   {
    path: "view-school/:id",
    component: ViewSchoolsDetailsComponent,
  },
  {
    path: "view-contact/:id",
    component: ViewContactInfoComponent,
  },
  // {
  //   path: "view-school/:id",
  //   component: ViewSchoolComponent,
  // },
  // {
  //   path: "view-school/:id",
  //   component: SchoolDetailsComponent,
  //   children: [
  //     { path: " ", component: ViewSchoolComponent }
  //   ],
  // },
]
@NgModule({
  declarations: [
    ListContactInfoComponent,
    ListFinancialDocumentsComponent,
    ListDetailedSchoolProfileComponent,
    ListSupportingDocumentsComponent,
    ListSchoolDocumentsComponent,
    ViewBasicSchoolInfoComponent,
    ViewSchoolsDetailsComponent,
    ListDirectorsComponent,
    ViewContactInfoComponent,
    ListSchoolsComponent,
    AddSchoolComponent,
    EditSchoolComponent,
    ViewSchoolComponent,
    SchoolDetailsComponent,
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
    NgbModule,
    NgbNavLink,
    NgbNavContent,
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
    
  ],
})
export class SchoolsModule {}
