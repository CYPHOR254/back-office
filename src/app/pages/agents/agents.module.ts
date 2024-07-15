import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { GeneralModule } from "src/app/shared/components/general/general.module";

import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { NgxOtpInputModule } from "ngx-otp-input";
import { TabsModule } from "ngx-bootstrap/tabs";
import { MatTabsModule } from "@angular/material/tabs";
import { ListAgentsComponent } from "./list-agents/list-agents.component";
import { AddAgentComponent } from "./add-agent/add-agent.component";
import { EditAgentComponent } from "./edit-agent/edit-agent.component";
import { ViewAgentComponent } from "./view-agent/view-agent.component";

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
import { ViewSchoolComponent } from "./view-agents-schools/view-school/view-school.component";
import { ListSchoolsComponent } from "./view-agents-schools/list-schools/list-schools.component";
import { AgentDetailsComponent } from "./view-agent/agent-details/agent-details.component";
import { AgentLoginHistoryComponent } from "./view-agent/agent-login-history/agent-login-history.component";
import { AgentSystemLogsComponent } from "./view-agent/agent-system-logs/agent-system-logs.component";

const agentsRoutes: Routes = [
  {
    path: "list-agents",
    component: ListAgentsComponent,
  },
  {
    path: "add-agent",
    component: AddAgentComponent,
  },
  {
    path: "view-agent/:id",
    component: ViewAgentComponent,
    children: [
      { path: "", component: AgentDetailsComponent },
      { path: "", component: ListSchoolsComponent },
      { path: "view-school", component: ViewSchoolComponent },
      { path: "agent-system-log", component: AgentSystemLogsComponent },
      { path: "login-history", component: AgentLoginHistoryComponent },
    ],
  },
  {
    path: "edit-agent/:id",
    component: EditAgentComponent,
  },
];

@NgModule({
  declarations: [
    ListAgentsComponent,
    ViewAgentComponent,
    AddAgentComponent,
    EditAgentComponent,
    ViewSchoolComponent,
    ListSchoolsComponent,
    AgentDetailsComponent,
    AgentLoginHistoryComponent,
    AgentSystemLogsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(agentsRoutes),
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
export class AgentModule {}
