import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {FlowService} from '../flow.service';
import {LoginService} from '../../login/login.service';
import {MasterService} from '../../master/master.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';
import {NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-myflow',
  templateUrl: './myflow.component.html',
  styleUrls: ['./myflow.component.css']
})
export class MyflowComponent implements OnInit {
  queryitems: any[] = [];
  querydata: any = {};
  listdata: any[] = [];
  listcolnames: any[] = [];
  queryitemsmap: any;

  constructor(private ls: LoginService, private ms: MasterService, private es: FlowService, private message: NzMessageService, private router: ActivatedRoute) {
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
      {'Controlname': 'Flowcontent', 'Controltype': 'textbox'},
      {
        'Controlname': 'Flowstatus', 'Controltype': 'checkboxgroup',
        'checkboxgroup': [],
        'datasource': '/assets/flowstatus.json'
      }
    ];
    this.listcolnames = [
      {'Controlname': 'Fiid', 'Controltype': 'label', 'width': '100px'},
      {'Controlname': 'Flowcontent', 'Controltype': 'routerLink', 'width': '200px'},
      {'Controlname': 'Taskname', 'Controltype': 'label'},
      {'Controlname': 'Flowstarttime', 'Controltype': 'label'},
      {'Controlname': 'Flowfinishtime', 'Controltype': 'label'},
      {'Controlname': 'Flowstatusname', 'Controltype': 'label'},
      {'Controlname': 'cancel', 'Controltype': 'linkAction'},
      {'Controlname': 'skip', 'Controltype': 'linkAction'},
      {'Controlname': 'restart', 'Controltype': 'linkAction'}
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
    if (event.colname == 'cancel') {
      this.es.cancelflow(event.data.Fiid, event.data.Flowtemplateid).subscribe(data => {
        this.message.info(data.status);
        this.refresh();
      });
    }
    if (event.colname == 'skip') {
      this.es.skiptask(event.data.Fiid, event.data.Tiid, event.data.Flowtemplateid).subscribe(data => {
        this.message.info(data.status);
        this.refresh();
      });
    }
  }

  refresh() {
    this.querydata.Caller = this.ls.userid;
    this.querydata.Flowstatus = this.ms.checkboxgroup2string(this.queryitems[5].checkboxgroup);
    this.es.getmyflow(this.querydata).subscribe(data => {
      let respons: any[] = [];
      respons = data;
      for (let data1 of respons) {
        // data1.Routerlink=data1.Url;
        data1.Routerlink = '/task-trace';
        data1.QueryParams = {'Mode': 'a', 'Flowinstid': data1.Fiid, 'Tiid': data1.Tiid};
      }
      this.listdata = respons;

    });
  }

  reset() {

    this.querydata = {};
    this.listdata = [];
    this.querydata.Caller = this.ls.userid;
    this.es.getmyflow(this.querydata).subscribe(data => {
      let respons: any[] = [];
      respons = data;
      for (let data1 of respons) {
        // data1.Routerlink=data1.Url;
        data1.Routerlink = '/task-trace';
        data1.QueryParams = {'Mode': 'a', 'Flowinstid': data1.Fiid, 'Tiid': data1.Tiid};
      }
      this.listdata = respons;
    });

  }

}
