import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { GeneralModule } from "src/app/shared/components/general/general.module";

import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { NgxOtpInputModule } from "ngx-otp-input";
import { TabsModule } from "ngx-bootstrap/tabs";
import { MatTabsModule } from "@angular/material/tabs";


import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";
import {
  AsyncPipe,
  CommonModule,
  NgForOf,
  NgIf,
  TitleCasePipe,
  UpperCasePipe,
} from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
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
import { ListTeachersComponent } from './list-teachers/list-teachers.component';
import { EditTeacherComponent } from './edit-teacher/edit-teacher.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';
import { ViewTeacherBasicInfoComponent } from './view-teacher/view-teacher-basic-info/view-teacher-basic-info.component';
import { TeacherSubjectsComponent } from './view-teacher/teacher-subjects/teacher-subjects.component';


const TeachersRoute: Routes = [
  {
    path: "list-teachers",
    component: ListTeachersComponent,
  },
  {
    path: "view-teacher/:id",
    component: ViewTeacherComponent,
  },
]
@NgModule({
  declarations: [
    ListTeachersComponent,
    EditTeacherComponent,
    AddTeacherComponent,
    ViewTeacherComponent,
    ViewTeacherBasicInfoComponent,
    TeacherSubjectsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TeachersRoute),
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

  ]
})
export class TeachersModule { }
