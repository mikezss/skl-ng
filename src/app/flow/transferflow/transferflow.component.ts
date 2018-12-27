import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {FlowService} from '../flow.service';
import {MasterService} from '../../master/master.service';
import {LoginService} from '../../login/login.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-transferflow',
  templateUrl: './transferflow.component.html',
  styleUrls: ['./transferflow.component.css']
})
export class TransferflowComponent implements OnInit {
  allusers: any[] = [];
  buttons: string[] = ['transfer'];
  queryitems: any = {};
  querydata: any = {};
  listdata: any[] = [];
  listcolnames: any[] = [];
  filteredOptions: any[] = [];

  constructor(private ls: LoginService, private ms: MasterService, private fs: FlowService, private message: NzMessageService, private router: Router) {
  }

  ngOnInit() {

    this.queryitems = [
      {
        'Controlname': 'Usertype', 'Controltype': 'radiogroup',
        'radiogroup': [], 'datasource': '/assets/usertype.json'
      },
      {
        'Controlname': 'Userid',
        'Controltype': 'select',
        'options': [],
        'datasource': this.ls.api_url + '/master/getalluseroptions',
        'nzMode': 'default'
      },
      {
        'Controlname': 'Transfertype', 'Controltype': 'radiogroup',
        'radiogroup': [], 'datasource': '/assets/transfertype.json', 'NotEditable': false
      },
      {
        'Controlname': 'Transferuserid',
        'Controltype': 'select',
        'options': [],
        'NotEditable': true,
        'datasource': this.ls.api_url + '/master/getalluseroptions',
        'nzMode': 'default'
      },
      {'Controlname': 'Cancel', 'Controltype': 'checkbox', 'NotEditable': true}
    ];
    this.listcolnames = [
      {'Controlname': 'Fiid', 'Controltype': 'label'},
      {'Controlname': 'Caller', 'Controltype': 'label'},
      {'Controlname': 'Flowcontent', 'Controltype': 'label'},
      {'Controlname': 'Taskid', 'Controltype': 'label'},
      {'Controlname': 'Flowstarttime', 'Controltype': 'label'},
      {'Controlname': 'Flowstatusname', 'Controltype': 'label'},
      {'Controlname': 'Editor', 'Controltype': 'label'}
    ];
    this.querydata.Usertype = '0';
    this.querydata.Transfertype = '0';
  }

  formdatachange(event) {
    if (event == 'Usertype' || event == 'Userid') {
      if (this.querydata.Usertype == '1') {
        this.querydata.Transfertype = '2';
      } else {
        this.querydata.Transfertype = '0';
      }
      this.getquery(event);
    }
    switch (this.querydata.Transfertype) {
      // 转签
      case '0':
        this.queryitems[3].NotEditable = false;
        this.queryitems[4].NotEditable = true;
        break;
      // 转岗
      case '1':
        this.queryitems[3].NotEditable = true;
        this.queryitems[4].NotEditable = true;
        break;
      // 离职
      case '2':
        this.queryitems[3].NotEditable = false;
        this.queryitems[4].NotEditable = false;
        break;
    }

    // this.getquery('query');
  }

  doAction(event) {
    console.log(event);
    console.log(this.listdata);
    let checkeddata: any[] = [];
    checkeddata = this.listdata.filter(data => data.Checked == true);
    console.log(checkeddata);
    if (checkeddata.length == 0 || checkeddata == null) {
      this.message.info('no data to be transfered');
      return;
    }
    // תǩ����������ת�����������������´��������ˡ�
    if (this.querydata.Transfertype == '0') {
      this.fs.transfersign({
        'Cancel': this.querydata.Cancel,
        'Submitter': this.ls.userid,
        'Transferuserid': this.querydata.Transferuserid,
        'Userid': this.querydata.Userid,
        'listdata': checkeddata
      }).subscribe(data => {
        this.message.info('submit==>' + data.status);
        this.getquery('Usertype');

      });
    }
    // ת�ڡ���������ת�����쵼�����´��������ˡ�
    if (this.querydata.Transfertype == '1') {
      this.fs.transferpost({
        'Cancel': this.querydata.Cancel,
        'Submitter': this.ls.userid,
        'Transferuserid': this.querydata.Transferuserid,
        'Userid': this.querydata.Userid,
        'listdata': checkeddata
      }).subscribe(data => {
        this.message.info('submit==>' + data.status);
        this.getquery('Usertype');

      });
    }
    // ��ְ��ת�����ˣ����������ˡ���ȡ�����̡�
    if (this.querydata.Transfertype == '2') {
      this.fs.leave({
        'Cancel': this.querydata.Cancel,
        'Submitter': this.ls.userid,
        'Transferuserid': this.querydata.Transferuserid,
        'Userid': this.querydata.Userid,
        'listdata': checkeddata
      }).subscribe(data => {
        this.message.info('submit==>' + data.status);
        this.getquery('Usertype');

      });
    }
  }

  getquery(event) {
    if (event == 'search') {
      console.log(this.querydata);
      this.querydata.Caller = this.querydata.Userid;
      this.fs.gettodotaskfortransfer(this.querydata).subscribe(data => {
        this.listdata = data;
      });
    } else {
      this.querydata = {};
    }

  }


}
