import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {FlowService} from '../flow.service';
import {LoginService} from '../../login/login.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';
import {NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent implements OnInit {
  queryitems: any[] = [];
  querydata: any = {};
  listdata: any[] = [];
  listcolnames: any[] = [];

  constructor(private ls: LoginService, private es: FlowService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.queryitems = [
      {'Controlname': 'Fiid', 'Controltype': 'textbox'},
      {'Controlname': 'Flowstarttime', 'Controltype': 'datepicker'},
      {'Controlname': 'Flowfinishtime', 'Controltype': 'datepicker'},
      {
        'Controlname': 'Flowtemplateid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/flow/getflowtemplateoptions'
      },
      {'Controlname': 'Flowcontent', 'Controltype': 'textbox'}
    ];
    this.listcolnames = [
      {'Controlname': 'Fiid', 'Controltype': 'label'},
      {'Controlname': 'Caller', 'Controltype': 'label'},
      {'Controlname': 'Flowcontent', 'Controltype': 'routerLink', 'width': '300px'},
      {'Controlname': 'Taskname', 'Controltype': 'label'},
      {'Controlname': 'Flowstarttime', 'Controltype': 'label'},
      {'Controlname': 'Flowstatusname', 'Controltype': 'label'},

    ];
    this.es.getflowtemplate().subscribe(data => {


      let conditionoptions: any[] = [];
      for (let condition of data) {
        conditionoptions.push({'label': condition.Flowtemplatename, 'value': condition.Flowtemplateid});
      }
      for (let colname of this.queryitems) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Flowtemplateid') {
          colname.options = conditionoptions;
        }
      }
    });
    this.refresh();

  }

  getquery(event) {
    console.log(event);
    if (event == 'search') {
      this.refresh();
    } else {
      this.querydata = {};
    }

  }

  edit(event) {
    console.log(event);
  }

  refresh() {
    this.querydata.Caller = this.ls.userid;
    this.es.gettodotask(this.querydata).subscribe(data => {
      let respons: any[] = [];
      respons = data;
      let mode: any;
      for (let data1 of respons) {
        mode = 'e';
        if (this.ls.userid == data1.Caller) {
          mode = 'a';
        }
        data1.Routerlink = data1.Url;
        data1.QueryParams = {'Mode': mode, 'Flowinstid': data1.Fiid, 'Tiid': data1.Tiid};
      }
      this.listdata = respons;

    });
  }

}
