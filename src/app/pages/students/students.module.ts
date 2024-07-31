import { ListStudentsComponent } from './list-students/list-students.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { RouterModule, Routes } from '@angular/router';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgModule } from "@angular/core";
import { AsyncPipe, CommonModule, NgForOf, NgIf, TitleCasePipe, UpperCasePipe } from "@angular/common";
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
import { MatTabsModule } from "@angular/material/tabs";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";
import { ViewStudentComponent } from './view-student/view-student.component';
import { ViewStudentBasicInfoComponent } from './view-student/view-student-basic-info/view-student-basic-info.component';
import { ViewStudentsMarkComponent } from './view-student/view-students-mark/view-students-mark.component';


const customerRoutes: Routes = [
  {
    path: 'list-students',
    component: ListStudentsComponent
  },
  {
    path: 'edit/:id',
    component: EditStudentComponent
  },
  {
    path: "view-student/:id",
    component: ViewStudentComponent,
  },
  {
    path: 'add',
    component: AddStudentComponent
  }
];

@NgModule({
  declarations: [
    ListStudentsComponent,
    EditStudentComponent,
    AddStudentComponent,
    ViewStudentComponent,
    ViewStudentBasicInfoComponent,
    ViewStudentsMarkComponent
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

  ]
})
export class StudentsModule { }
