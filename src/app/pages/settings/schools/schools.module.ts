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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SchoolsComponent } from "./schools/schools.component";
import { ListSchoolCategoriesComponent } from "./school-categories/list-school-categories/list-school-categories.component";
import { ListSchoolCurriculumComponent } from "./school-curriculum/list-school-curriculum/list-school-curriculum.component";
import { ListSchoolDesignationComponent } from "./school-designation/list-school-designation/list-school-designation.component";
import { ListSchoolGenderComponent } from "./school-gender/list-school-gender/list-school-gender.component";
import { ListSchoolTypeComponent } from "./school-types/list-school-type/list-school-type.component";
import { EditSchoolCurriculumComponent } from "./school-curriculum/edit-school-curriculum/edit-school-curriculum.component";
import { EditSchoolCategoriesComponent } from "./school-categories/edit-school-categories/edit-school-categories.component";
import { EditSchoolDesignationComponent } from "./school-designation/edit-school-designation/edit-school-designation.component";
import { EditSchoolGenderComponent } from "./school-gender/edit-school-gender/edit-school-gender.component";
import { EditSchoolTypeComponent } from "./school-types/edit-school-type/edit-school-type.component";
import { AddSchoolCategoriesComponent } from "./school-categories/add-school-categories/add-school-categories.component";
import { AddSchoolCurriculumComponent } from "./school-curriculum/add-school-curriculum/add-school-curriculum.component";
import { AddSchoolDesignationComponent } from "./school-designation/add-school-designation/add-school-designation.component";
import { AddSchoolGenderComponent } from "./school-gender/add-school-gender/add-school-gender.component";
import { AddSchoolTypeComponent } from "./school-types/add-school-type/add-school-type.component";
import { ListDioceseComponent } from "./diocese/list-diocese/list-diocese.component";
import { DioceseCountyComponent } from "./diocese/diocese-county/diocese-county.component";
import { ViewDioceseByCountyComponent } from "./diocese/view-diocese-by-county/view-diocese-by-county.component";
import { ListPasswordsComponent } from './manage-unauthorized-passwords/list-passwords/list-passwords.component';
import { AddPasswordsComponent } from './manage-unauthorized-passwords/add-passwords/add-passwords.component';

const schoolsRoutes: Routes = [
  {
    path: "",
    component: SchoolsComponent,
    children: [
      { path: "", component: ListSchoolCategoriesComponent },
      { path: "school-categories", component: ListSchoolCategoriesComponent },
      { path: "school-curriculum", component: ListSchoolCurriculumComponent },
      { path: "school-designation", component: ListSchoolDesignationComponent },
      { path: "school-gender", component: ListSchoolGenderComponent },
      { path: "school-types", component: ListSchoolTypeComponent },

    ],
  },
];

@NgModule({
  declarations: [
    SchoolsComponent,
    ListSchoolCategoriesComponent,
    ListSchoolDesignationComponent,
    ListSchoolCurriculumComponent,
    ListSchoolTypeComponent,
    ListSchoolGenderComponent,
    EditSchoolCurriculumComponent,
    EditSchoolCategoriesComponent,
    EditSchoolDesignationComponent,
    EditSchoolGenderComponent,
    EditSchoolTypeComponent,
    AddSchoolCategoriesComponent,
    AddSchoolCurriculumComponent,
    AddSchoolDesignationComponent,
    AddSchoolGenderComponent,
    AddSchoolTypeComponent,
    ListDioceseComponent,
    DioceseCountyComponent,
    ViewDioceseByCountyComponent,
    ListPasswordsComponent,
    AddPasswordsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(schoolsRoutes),
    GeneralModule,
    NgbProgressbar,
    ReactiveFormsModule,
    NgbNavOutlet,
    NgbNavItem,
    NgbNav,
    NgbCollapse,
    NgbPopover,
    FormsModule, // Add FormsModule here
    NgxDatatableModule,
  ],
})
export class SchoolsModule {}
