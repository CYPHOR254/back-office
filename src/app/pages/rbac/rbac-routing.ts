import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListProfilesComponent } from "./Profiles/list-profiles/list-profiles.component";
import { ListRolesComponent } from "./Roles/list-roles/list-roles.component";
import { ProfileRolesComponent } from "./Profiles/profile-roles/profile-roles.component";
import { AddProfileComponent } from "./Profiles/add-profile/add-profile.component";
import { AddRoleComponent } from "./Roles/add-role/add-role.component";
import { EditRoleComponent } from "./Roles/edit-role/edit-role.component";
import { ViewRoleComponent } from "./Roles/view-role/view-role.component";
import { EditProfileComponent } from "./Profiles/edit-profile/edit-profile.component";
import { ChangePasswordComponent } from "src/app/other-logins/change-password/change-password.component";
import { AuthGuard } from "src/app/shared/guards/auth.guard";

const routes: Routes = [
  {
    path: "add-role",
    component: AddRoleComponent,
  },
  {
    path: "list-roles",
    component: ListRolesComponent,
  },
  {
    path: "view-role/:id",
    component: ViewRoleComponent,
  },
  {
    path: "edit-role/:id",
    component: EditRoleComponent,
  },

  {
    path: "profile/:id",
    component: ProfileRolesComponent,
  },

  {
    path: "list-profiles",
    component: ListProfilesComponent,
  },
  {
    path: "add-profile",
    component: AddProfileComponent,
  },
  {
    path: "edit-profile/:id",
    component: EditProfileComponent,
  },

  {
    path: "change-own-password",
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
];

export const RbacRoutingModule: ModuleWithProviders<any> = RouterModule.forChild(
  routes
);
