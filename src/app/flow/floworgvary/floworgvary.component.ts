import {Component, OnInit} from '@angular/core';
import {FlowService} from '../flow.service';
import {MasterService} from '../../master/master.service';
import {OrgService} from '../../org/org.service';
import {LoginService} from '../../login/login.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-floworgvary',
  templateUrl: './floworgvary.component.html',
  styleUrls: ['./floworgvary.component.css']
})
export class FloworgvaryComponent implements OnInit {
  queryitems: any[] = [];
  querydata: any = {};
  listdata: any[] = [];
  listcolnames: any[] = [];
  pageindex = 1;
  pagesize = 10;
  total = 1;
  loading = false;

  constructor(private ls: LoginService, private os: OrgService, private ms: MasterService, private fs: FlowService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.queryitems = [
      {
        'Controlname': 'Orgid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/master/getallorgoptions'
      },
      {
        'Controlname': 'Vid', 'Controltype': 'select', 'options': [], 'nzMode': 'default',
        'datasource': this.ls.api_url + '/master/getorgvaryoptions'
      }
    ];
    this.listcolnames = [
      {
        'Controlname': 'Orgid', 'Controltype': 'select', 'options': [], 'nzMode': 'default',
        'datasource': this.ls.api_url + '/master/getallorgoptions'
      },
      {
        'Controlname': 'Vid', 'Controltype': 'select', 'options': [], 'nzMode': 'default',
        'datasource': this.ls.api_url + '/master/getorgvaryoptions'
      },
      {'Controlname': 'Vvalue', 'Controltype': 'textbox'}
    ];

    this.ms.getorgvary().subscribe(data => {
      const conditionoptions: any[] = [];
      for (const condition of data) {
        conditionoptions.push({'label': condition.Vname, 'value': condition.Vid});
      }
      for (const colname of this.listcolnames) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Vid') {
          colname.options = conditionoptions;
          break;
        }
      }
      for (const colname of this.queryitems) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Vid') {
          colname.options = conditionoptions;
          break;
        }
      }
    });
    this.os.getorgs().subscribe(data => {
      const conditionoptions: any[] = [];
      for (const condition of data) {
        conditionoptions.push({'label': condition.Orgname, 'value': condition.Orgid});
      }
      for (const colname of this.listcolnames) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Orgid') {
          colname.options = conditionoptions;
        }
      }
      for (const colname of this.queryitems) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Orgid') {
          colname.options = conditionoptions;
        }
      }
    });
    this.fs.getfloworgvarycount().subscribe(response => {
      this.total = response.Total;
    });
    this.refreshtable({'Pageindex': 1, 'Pagesize': 10});


  }

  save(event) {

    this.fs.savefloworgvary(this.listdata).subscribe(data => {
      this.message.info('submit==>' + data.status);
    });
  }

  refreshtable(event) {

    console.log(event);
    this.pageindex = event.Pageindex;
    this.pagesize = event.Pagesize;
    this.loading = true;
    this.fs.getfloworgvarybypageindex({
      'Pageindex': this.pageindex,
      'Pagesize': this.pagesize,
      'Orgid': this.querydata.Orgid,
      'Vid': this.querydata.Vid
    }).subscribe(response => {
      this.listdata = [];
      this.listdata = response;
      this.loading = false;
    });
  }

  getquery(event) {
    console.log(event);
    if (event == 'search') {
      this.loading = true;
      this.fs.getfloworgvarybypageindex({
        'Pageindex': this.pageindex,
        'Pagesize': this.pagesize,
        'Orgid': this.querydata.Orgid,
        'Vid': this.querydata.Vid
      }).subscribe(response => {
        this.listdata = [];
        this.listdata = response;
        this.loading = false;
      });
    } else {
      this.reset();
    }
  }

  reset() {
    this.pageindex = 1;
    this.pagesize = 10;
    this.querydata = {};
    this.listdata = [];
    this.fs.getfloworgvarycount().subscribe(response => {
      this.total = response.Total;
    });
    this.refreshtable({'Pageindex': 1, 'Pagesize': 10});
  }

}
