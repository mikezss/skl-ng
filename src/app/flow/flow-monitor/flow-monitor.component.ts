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
  selector: 'app-flow-monitor',
  templateUrl: './flow-monitor.component.html',
  styleUrls: ['./flow-monitor.component.css']
})
export class FlowMonitorComponent implements OnInit {
  queryitems: any[] = [];
  querydata: any = {};
  listdata: any[] = [];
  listcolnames: any[] = [];
  pageindex = 1;
  pagesize = 10;
  total = 1;
  loading = false;

  constructor(private ls: LoginService, private ms: MasterService, private fs: FlowService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.queryitems = [
      {'Controlname': 'Fiid', 'Controltype': 'textbox'},
      {'Controlname': 'Flowstarttime', 'Controltype': 'datepicker'},
      {'Controlname': 'Flowfinishtime', 'Controltype': 'datepicker'},
      {
        'Controlname': 'Flowtemplateid', 'Controltype': 'select', 'options': [], 'nzMode': 'default',
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
      {'Controlname': 'Fiid', 'Controltype': 'label'},
      {'Controlname': 'Caller', 'Controltype': 'label'},
      {'Controlname': 'Flowcontent', 'Controltype': 'routerLink', 'width': '300px'},
      {'Controlname': 'Taskname', 'Controltype': 'label'},
      {'Controlname': 'Flowfinishtime', 'Controltype': 'label'},
      {'Controlname': 'Flowstatusname', 'Controltype': 'label'}
    ];
    this.fs.getflowtemplate().subscribe(data => {


      const conditionoptions: any[] = [];
      for (const condition of data) {
        conditionoptions.push({'label': condition.Flowtemplatename, 'value': condition.Flowtemplateid});
      }
      for (const colname of this.queryitems) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Flowtemplateid') {
          colname.options = conditionoptions;
        }
      }
    });
    this.querydata.Fiid = '';
    this.fs.getflowmonitorcount(this.querydata).subscribe(response => {
      this.total = response.Total;
    });
    this.refreshtable({'Pageindex': 1, 'Pagesize': 10});

  }

  getquery(event) {
    console.log(event);
    if (event == 'search') {
      this.loading = true;
      this.querydata.Pagesize = this.pagesize;
      if (this.querydata.Fiid != 'undefined' && this.querydata.Fiid != '') {
        this.querydata.Fiid = parseInt(this.querydata.Fiid);
      }
      this.querydata.Flowstatus = this.ms.checkboxgroup2string(this.queryitems[5].checkboxgroup);
      this.fs.getflowmonitorcount(this.querydata).subscribe(response => {
        this.total = response.Total;
      });

      this.fs.getflowmonitorbypageindex(this.querydata).subscribe(data => {
        let respons: any[] = [];
        respons = data;
        for (const data1 of respons) {
          // <a [routerLink]="['/product']" [queryParams]="{id:1}"></a>
          // data1.Routerlink=data1.Url;
          data1.Routerlink = '/task-trace';
          data1.QueryParams = {'Mode': 's', 'Flowinstid': data1.Fiid, 'Tiid': data1.Tiid};
        }
        this.listdata = respons;
        this.loading = false;
      });
    } else {
      this.reset();
    }
  }

  edit(event) {
    console.log(event);
  }

  refreshtable(event) {

    console.log(event);
    this.pageindex = event.Pageindex;
    this.pagesize = event.Pagesize;
    this.loading = true;
    this.querydata.Pageindex = this.pageindex;
    this.querydata.Pagesize = this.pagesize;
    console.log(this.querydata.Fiid);
    if (this.querydata.Fiid != 'undefined' && this.querydata.Fiid != '') {
      this.querydata.Fiid = parseInt(this.querydata.Fiid);
    }

    this.fs.getflowmonitorbypageindex(this.querydata).subscribe(data => {
      let respons: any[] = [];
      respons = data;
      for (const data1 of respons) {
        // <a [routerLink]="['/product']" [queryParams]="{id:1}"></a>
        // data1.Routerlink=data1.Url;
        data1.Routerlink = '/task-trace';
        data1.QueryParams = {'Mode': 's', 'Flowinstid': data1.Fiid, 'Tiid': data1.Tiid, 'Url': data1.Url};
      }
      this.listdata = respons;
      this.loading = false;
    });
  }

  reset() {
    this.querydata = {};
    this.querydata.Fiid = '';
    this.listdata = [];
    this.loading = false;
    this.pageindex = 1;
    this.pagesize = 10;
    this.fs.getflowmonitorcount(this.querydata).subscribe(response => {
      this.total = response.Total;
    });
    this.refreshtable({'Pageindex': 1, 'Pagesize': 10});
  }

}
