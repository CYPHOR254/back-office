import {NgModule} from '@angular/core';
import {RbacRoutingModule} from './rbac-routing';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {NgSelectModule} from "@ng-select/ng-select";
import {AsyncPipe, NgForOf, NgIf, TitleCasePipe, UpperCasePipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {
  NgbAlert,
  NgbCollapse,
  NgbNav,
  NgbNavContent,
  NgbNavItem, NgbNavLink,
  NgbNavOutlet,
  NgbProgressbar
} from "@ng-bootstrap/ng-bootstrap";
import {GeneralModule} from "../../shared/components/general/general.module";
import {ListProfilesComponent} from "./Profiles/list-profiles/list-profiles.component";
import {ListRolesComponent} from "./Roles/list-roles/list-roles.component";
import {AddProfileComponent} from "./Profiles/add-profile/add-profile.component";
import {AddRoleComponent} from "./Roles/add-role/add-role.component";
import {ProfileRolesComponent} from "./Profiles/profile-roles/profile-roles.component";
import { ViewRoleComponent } from './Roles/view-role/view-role.component';
import { EditRoleComponent } from './Roles/edit-role/edit-role.component';
import { ViewProfileComponent } from './Profiles/view-profile/view-profile.component';
import { EditProfileComponent } from './Profiles/edit-profile/edit-profile.component';


@NgModule({
  imports: [
    RbacRoutingModule, 
    NgxDatatableModule, 
    NgSelectModule, AsyncPipe, ReactiveFormsModule, NgbNavOutlet, NgbNavItem, NgbNav, NgbNavContent, UpperCasePipe, NgbCollapse, GeneralModule, TitleCasePipe, NgbProgressbar, NgbAlert, NgIf, NgbNavLink, NgForOf],
    declarations: [
    AddRoleComponent,
    ListProfilesComponent,
    ListRolesComponent,
    ProfileRolesComponent,
    AddProfileComponent,
    ViewRoleComponent,
    EditRoleComponent,
    ViewProfileComponent,
    EditProfileComponent
  ]
 
})
export class RbacModule {
}
