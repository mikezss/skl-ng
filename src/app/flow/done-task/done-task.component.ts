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
  selector: 'app-done-task',
  templateUrl: './done-task.component.html',
  styleUrls: ['./done-task.component.css']
})
export class DoneTaskComponent implements OnInit {
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
      {'Controlname': 'Flowcontent', 'Controltype': 'textbox', 'width': '300px'},
      {
        'Controlname': 'Flowstatus', 'Controltype': 'checkboxgroup',
        'checkboxgroup': [],
        'datasource': '/assets/flowstatus.json'
      }
    ];
    this.listcolnames = [
      {'Controlname': 'Fiid', 'Controltype': 'label'},
      {'Controlname': 'Caller', 'Controltype': 'label'},
      {'Controlname': 'Flowcontent', 'Controltype': 'routerLink'},
      {'Controlname': 'Taskname', 'Controltype': 'label'},
      {'Controlname': 'Flowfinishtime', 'Controltype': 'label'},
      {'Controlname': 'Flowstatusname', 'Controltype': 'label'}
    ];

    this.refresh();

  }

  getquery(event) {

    console.log(event);
    if (event == 'search') {
      this.refresh();
    } else {
      this.reset();
    }


  }

  edit(event) {
    console.log(event);
  }

  refresh() {
    this.querydata.Caller = this.ls.userid;
    this.es.getdonetask(this.querydata).subscribe(data => {
      if ( data.status == 'false') {
        this.message.info(data.result);
      } else {
        let respons: any[] = [];
        respons = data;
        for (let data1 of respons) {
          // <a [routerLink]="['/product']" [queryParams]="{id:1}"></a>
          // data1.Routerlink=data1.Url;
          data1.Routerlink = '/task-trace';
          data1.QueryParams = {'Mode': 's', 'Flowinstid': data1.Fiid, 'Tiid': data1.Tiid, 'Url': data1.Url};
        }
        this.listdata = respons;
      }

    });
  }

  reset() {
    this.querydata = {};
  }

}
