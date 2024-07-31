import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { DashboardLayoutComponent } from "./layouts/dashboardlayout.component";
import { MinComponent } from "./layouts/min.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { ForgotPasswordComponent } from "./other-logins/forgot-password/forgot-password.component";
import { ForgotResetPasswordComponent } from "./other-logins/forgot-reset-password/forgot-reset-password.component";
import { ChangeDefaultPasswordComponent } from "./other-logins/change-default-password/change-default-password.component";
import { ChangePasswordComponent } from "./other-logins/change-password/change-password.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ListSystemAdminsComponent } from "./pages/system-admin/list-system-admins/list-system-admins.component";
// import { SchoolCurriculumsComponent } from "./pages/school-curriculums/school-curriculums.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardLayoutComponent,
    canActivate: [AuthGuard],  
    children: [
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./dashboard/dashboards.module").then(
            (m) => m.DashboardsModule
          ),
      },

      {
        path: "schools",
        loadChildren: () =>
          import("./pages/schools/schools.module").then((m) => m.SchoolsModule),
      },

      {
        path: "agents",
        loadChildren: () =>
          import("./pages/agents/agents.module").then((m) => m.AgentModule),
      },
      {
        path: "system-admin",
        loadChildren: () =>
          import("./pages/system-admin/system-admin.module").then((m) => m.SystemAdminModule),
      },
      {
        path: "partners",
        loadChildren: () =>
          import("./pages/partners/partners.module").then(
            (m) => m.PartnersModule
          ),
      },
      {
        path: "teachers",
        loadChildren: () =>
          import("./pages/teachers/teachers.module").then((m) => m.TeachersModule),
      },
      {
        path: "students",
        loadChildren: () =>
          import("./pages/students/students.module").then((m) => m.StudentsModule),
      },
      {
        path: "rbac",
        loadChildren: () =>
          import("./pages/rbac/rbac.module").then((m) => m.RbacModule),
      },
      {
        path: "reports",
        loadChildren: () =>
          import("./pages/report/report.module").then((m) => m.ReportModule),
      },
      {
        path: "settings",
        loadChildren: () =>
          import("./pages/settings/settings.module").then(
            (m) => m.SettingsModule
          ),
      },
      {
        path: "system-users",
        loadChildren: () =>
          import("./pages/system-users/sytem_user.module").then(
            (m) => m.SystemUsersModule
          ),
      },
      {
        path: "user-profile",component:UserProfileComponent
    
      },
    ],
  },
  {
    path: "",
    component: MinComponent,
    children: [
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "change-default-password",
        component: ChangeDefaultPasswordComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
      },
      {
        path: "forgot-reset-password",
        component: ForgotResetPasswordComponent,
      },
      {
        path: "forgot-reset-password",
        component: ListSystemAdminsComponent,
      },

      {
        path: "change-own-password",
        component: ChangePasswordComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: "user-profile",
        component: UserProfileComponent,
        canActivate: [AuthGuard],
      },
      // {
      //   path: 'school-curriculum',
      //   component: SchoolCurriculumsComponent
      // },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
