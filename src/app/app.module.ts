import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from "./app.component";
import { MinComponent } from "./layouts/min.component";
import { DashboardLayoutComponent } from "./layouts/dashboardlayout.component";
import { HeaderComponent } from "./layouts/parts/header.component";
import { SidebarComponent } from "./layouts/parts/sidebar.component";
import {
  SidebaritemComponent,
  SidebaritemInnerComponent,
 
} from "./layouts/parts/sidebaritem.component";
import { BlankPageComponent } from "./blank-page/blank-page.component";
import { LoginComponent } from "./login/login.component";
import { ErrorComponent } from "./error/error.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { ToastrModule } from "ngx-toastr";
import { NgbDropdownModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgxOtpInputModule } from "ngx-otp-input";
import { NgSelectModule } from "@ng-select/ng-select";
import { ChangePasswordComponent } from "./other-logins/change-password/change-password.component";
import { AuthGuard } from "./shared/guards/auth.guard";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { GeneralModule } from "./shared/components/general/general.module";
import { MatTabsModule } from "@angular/material/tabs";
import { ChangeDefaultPasswordComponent } from "./other-logins/change-default-password/change-default-password.component";
import { ForgotPasswordComponent } from "./other-logins/forgot-password/forgot-password.component";
import { ForgotResetPasswordComponent } from "./other-logins/forgot-reset-password/forgot-reset-password.component";
import { UserProfileComponent } from "./pages/user-profile/user-profile.component";
import { ReportComponent } from "./pages/report/report/report.component";
import { CheckTokenValidityInterceptor } from "./shared/interceptors/check-token-validity-interceptor.service";
import { GlobalServService } from "./shared/services/global-serv.service";
import { VersionService } from "./shared/services/version.service";
import { FooterComponent } from "./layouts/parts/footer.component";
import { LoginHistoryComponent } from './pages/user-profile/login-history/login-history.component';
import { BasicInfoComponent } from './pages/user-profile/basic-info/basic-info.component';
import { ApprovedSchoolsComponent } from './pages/user-profile/approved-schools/approved-schools.component';
import { AddedSchoolsComponent } from './pages/user-profile/added-schools/added-schools.component';
import { RejectedSchoolsComponent } from './pages/user-profile/rejected-schools/rejected-schools.component';
import { ClarificationSchoolsComponent } from './pages/user-profile/clarification-schools/clarification-schools.component';
import { CreatedUsersComponent } from './pages/user-profile/created-users/created-users.component';
import { TabOrderDirective } from "./shared/directives/TabsOrderDirective";
import { TogglePasswordDirective } from './shared/directives/toggle-password.directive';
import { ShowPasswordToggleComponent } from './shared/components/show-password-toggle/show-password-toggle.component';
import { SchoolCurriculumsComponent } from "./pages/school-curriculums/school-curriculums.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
  declarations: [
    TabOrderDirective,
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MinComponent,
    DashboardLayoutComponent,
    SidebaritemComponent,
    SidebaritemInnerComponent,
    BlankPageComponent,
    LoginComponent,
    ErrorComponent,
    ChangePasswordComponent,
    ChangeDefaultPasswordComponent,
    ForgotPasswordComponent,
    ForgotResetPasswordComponent,
    UserProfileComponent,
    ReportComponent,
    FooterComponent,
    LoginHistoryComponent,
    BasicInfoComponent,
    ApprovedSchoolsComponent,
    AddedSchoolsComponent,
    RejectedSchoolsComponent,
    ClarificationSchoolsComponent,
    CreatedUsersComponent,
    TogglePasswordDirective,
    ShowPasswordToggleComponent,
    SchoolCurriculumsComponent,
  


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressbarModule.forRoot(),
    ToastrModule.forRoot(),
    NgApexchartsModule,
    NgbDropdownModule,
    NgxOtpInputModule,
    NgSelectModule,
    NgbModule,
    NgxImageZoomModule,
    GeneralModule,
    MatTabsModule,
    NgbModule,
    NgxPaginationModule,
    NgxDatatableModule
  ],
  providers: [
    AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: CheckTokenValidityInterceptor,
      multi: true,
    },
    VersionService,
    GlobalServService,
  ],
  bootstrap: [AppComponent,GeneralModule],
})
export class AppModule {}
