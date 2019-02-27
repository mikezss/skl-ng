import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../login/login.service';
import {MasterService} from '../../master/master.service';
import {FlowService} from '../flow.service';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {
  mode = 'a';
  allusers: any[] = [];
  tabindex: any = 0;
  listdata: any[] = [];
  listcolnames: any[] = [];
  querydata: any = {};
  queryitems: any[] = [];
  userlistdata: any[] = [];
  userlistcolnames: any[] = [];

  constructor(private ms: MasterService, private fs: FlowService, private ls: LoginService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.listcolnames = [
      {
        'Controlname': 'Userid',
        'Controltype': 'select',
        'options': [],
        'datasource': this.ls.api_url + '/master/getalluseroptions',
        'nzMode': 'default'
      },
      {
        'Controlname': 'Agent',
        'Controltype': 'select',
        'options': [],
        'datasource': this.ls.api_url + '/flow/getuserforagentoptions',
        'nzMode': 'default'
      },
      {'Controlname': 'Startdate', 'Controltype': 'datepicker'},
      {'Controlname': 'Enddate', 'Controltype': 'datepicker'}
    ];

    this.queryitems = [
      {'Controlname': 'Userid', 'Controltype': 'textbox'},
      {
        'Controlname': 'Usertype',
        'Controltype': 'select',
        'checkboxgroup': [],
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'usertype'},
        'nzMode': 'default'
      }
    ];

    this.userlistcolnames = [
      {'Controlname': 'Userid', 'Controltype': 'label'},
      {'Controlname': 'Username', 'Controltype': 'label'}
    ];

    this.fs.getagent().subscribe(response => {
      // console.log(response);

      this.listdata = response;
    });
  }

  saveagent(event) {
    // console.log(event);
    console.log(this.listdata);
    if (event == 'save') {
      this.fs.saveagent(this.listdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }

  getquery(event) {
    if (event == 'search') {
      this.querydata.Submitter = this.ls.userid;
      if (this.querydata.Usertype == '1') {
        this.querydata.Isleader = true;
      } else {
        this.querydata.Isleader = false;
      }
      this.fs.getuserforagent(this.querydata).subscribe(response => {
        // console.log(response);

        this.userlistdata = response;
      });
    }

    if (event == 'reset') {
      this.querydata = {};
    }

  }

  edit(event) {
  }

  inputfilter2(inputdata): void {
    // console.log(inputcolname);
    // console.log(this.allusers);
    let filteredOptions: any[] = [];
    filteredOptions = this.allusers.filter(option => option.toLowerCase().indexOf(inputdata.data[inputdata.colname].toLowerCase()) === 0);
    console.log(filteredOptions);
    for (let colname of this.listcolnames) {
      if (colname.Controltype == 'atcomplete' && colname.Controlname == inputdata.colname) {
        colname.datasource = filteredOptions;
        break;
      }
    }
  }

}
