import {SklCoreModule} from '../skl-core/skl-core.module';
import {SklCommonModule} from '../common/common.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';


import {TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateService} from '@ngx-translate/core';

import {FlowdefineComponent} from './flowdefine/flowdefine.component';
import {Routes} from '@angular/router';
import {FlowdefineSwitchComponent} from './flowdefine-switch/flowdefine-switch.component';
import {FlowdefineManComponent} from './flowdefine-man/flowdefine-man.component';
import {FlowdefineMenuComponent} from './flowdefine-menu/flowdefine-menu.component';
import {FlowtemplateComponent} from './flowtemplate/flowtemplate.component';
import {MyflowComponent} from './myflow/myflow.component';
import {TodoTaskComponent} from './todo-task/todo-task.component';
import {DoneTaskComponent} from './done-task/done-task.component';
import {FlowMonitorComponent} from './flow-monitor/flow-monitor.component';
import {TodoTraceComponent} from './todo-trace/todo-trace.component';
import {DoneTraceComponent} from './done-trace/done-trace.component';
import {TraceHeaderComponent} from './trace-header/trace-header.component';
import {TaskTraceComponent} from './task-trace/task-trace.component';
import {AuthGuard} from '../auth-guard.service';
import {HttpClient, HttpParams} from '@angular/common/http';

import {FlowService} from './flow.service';
import {FlowstatusComponent} from './flowstatus/flowstatus.component';
import {FloworgvaryComponent} from './floworgvary/floworgvary.component';
import {AgentComponent} from './agent/agent.component';
import {TransferflowComponent} from './transferflow/transferflow.component';


export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

const adminRoutes: Routes = [
  {
    path: '',
    component: TaskTraceComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {path: 'done-trace', component: DoneTraceComponent},
          {path: 'todo-trace', component: TodoTraceComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    SklCoreModule,
    SklCommonModule,
    RouterModule, TranslateModule,
    RouterModule.forChild(adminRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateHttpLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [FlowdefineMenuComponent, RouterModule],
  providers: [AuthGuard, TranslateService, FlowService],
  declarations: [FlowdefineComponent, FlowdefineSwitchComponent, FlowdefineManComponent, FlowdefineMenuComponent, FlowtemplateComponent, MyflowComponent, TodoTaskComponent, DoneTaskComponent, FlowMonitorComponent, TodoTraceComponent, DoneTraceComponent, TraceHeaderComponent, TaskTraceComponent, FlowstatusComponent, FloworgvaryComponent, AgentComponent, TransferflowComponent]
})
export class FlowModule {
}
