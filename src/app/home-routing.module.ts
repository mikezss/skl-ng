import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth-guard.service';
import {FlowtemplateComponent} from './flow/flowtemplate/flowtemplate.component';
import {MyflowComponent} from './flow/myflow/myflow.component';
import {TodoTaskComponent} from './flow/todo-task/todo-task.component';
import {DoneTaskComponent} from './flow/done-task/done-task.component';
import {FlowMonitorComponent} from './flow/flow-monitor/flow-monitor.component';
import {TaskTraceComponent} from './flow/task-trace/task-trace.component';
import {OrgtypeComponent} from './master/orgtype/orgtype.component';
import {ModualComponent} from './master/modual/modual.component';
import {RoleComponent} from './role/role/role.component';
import {OrgComponent} from './org/org/org.component';
import {UserComponent} from './user/user/user.component';
import {UsermanageComponent} from './user/usermanage/usermanage.component';
import {UsergroupComponent} from './user/usergroup/usergroup.component';
import {FlowdefineComponent} from './flow/flowdefine/flowdefine.component';
import {FloworgvaryComponent} from './flow/floworgvary/floworgvary.component';
import {FlowstatusComponent} from './flow/flowstatus/flowstatus.component';
import {OrgvaryComponent} from './master/orgvary/orgvary.component';
import {PasswordchangeComponent} from './user/passwordchange/passwordchange.component';
import {PasswordresetComponent} from './user/passwordreset/passwordreset.component';
import {AgentComponent} from './flow/agent/agent.component';
import {TransferflowComponent} from './flow/transferflow/transferflow.component';
import {UserinfoComponent} from './user/userinfo/userinfo.component';
import {LangComponent} from './master/lang/lang.component';
import {EnumComponent} from './master/enum/enum.component';
import {CompanyComponent} from './master/company/company.component';
import {PortalComponent} from './home/portal/portal.component';
import {EnumsearchComponent} from './master/enumsearch/enumsearch.component';
import {HomeComponent} from './home/home/home.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {path: 'flowtemplate', component: FlowtemplateComponent},
          {path: 'flowdefine', component: FlowdefineComponent},
          {path: 'myflow', component: MyflowComponent},
          {path: 'todo', component: TodoTaskComponent},
          {path: 'donetask', component: DoneTaskComponent},
          {path: 'flow-monitor', component: FlowMonitorComponent},
          {path: 'task-trace', component: TaskTraceComponent},
          {path: 'orgtype', component: OrgtypeComponent},
          {path: 'modual', component: ModualComponent},
          {path: 'role', component: RoleComponent},
          {path: 'org', component: OrgComponent},
          {path: 'user', component: UserComponent},
          {path: 'usermanage', component: UsermanageComponent},
          {path: 'usergroup', component: UsergroupComponent},
          {path: 'floworgvary', component: FloworgvaryComponent},
          {path: 'orgvary', component: OrgvaryComponent},
          {path: 'flowstatus', component: FlowstatusComponent},
          {path: 'passwordchange', component: PasswordchangeComponent},
          {path: 'passwordreset', component: PasswordresetComponent},
          {path: 'agent', component: AgentComponent},
          {path: 'transferflow', component: TransferflowComponent},
          {path: 'userinfo', component: UserinfoComponent},
          {path: 'enum', component: EnumComponent},
          {path: 'company', component: CompanyComponent},
         
          {path: 'portal', component: PortalComponent},
          {path: 'enumsearch', component: EnumsearchComponent},
	   {path: 'lang', component: LangComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule, RouterModule.forChild(adminRoutes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
