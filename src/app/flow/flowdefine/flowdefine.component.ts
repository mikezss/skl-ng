import {Component, OnInit} from '@angular/core';
import {UploadFile} from 'ng-zorro-antd';
import {NzMessageService} from 'ng-zorro-antd';
import {FlowService} from '../flow.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-flowdefine',
  templateUrl: './flowdefine.component.html',
  styleUrls: ['./flowdefine.component.css']
})
export class FlowdefineComponent implements OnInit {
  flowname = '';
  tasktype = '';
  manformdata: any = {};
  manactiondata: any[] = [];
  manexecuterdata: any[] = [];
  manformcolnames: any[] = [];
  manactioncolnames: any[] = [];
  manexecutercolnames: any[] = [];
  manformfileList: UploadFile[] = [];
  manactionfileList: UploadFile[] = [];
  manexecuterfileList: UploadFile[] = [];

  switchformdata: any = {};
  switchactiondata: any[] = [];
  switchformcolnames: any[] = [];
  switchactioncolnames: any[] = [];
  switchformfileList: UploadFile[] = [];
  switchactionfileList: UploadFile[] = [];

  menudata: any[] = [];

  selectedflowtemplateid: string;
  selectedtaskid: string;
  flowtemplateoptions: any[] = [];

  constructor(private es: FlowService, private message: NzMessageService, private router: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit() {
    // console.log("ngOnInit()");

    this.manformcolnames = [
      {Controlname: 'Taskid', Controltype: 'textbox'},
      {Controlname: 'Taskname', Controltype: 'textbox'},
      {
        Controlname: 'Skip', Controltype: 'checkboxgroup',
        checkboxgroup: [],
        'datasource': '/assets/skip.json'
      },
      {
        Controlname: 'Concurrent', Controltype: 'radiogroup',
        radiogroup: [],
        'datasource': '/assets/concurrent.json'
      },
      {Controlname: 'Samepersontask', Controltype: 'select', options: [], 'nzMode': 'default'},
      {Controlname: 'Nopersontask', Controltype: 'select', options: [], 'nzMode': 'default'}
    ];

    this.manactioncolnames = [
      {
        Controlname: 'Action', Controltype: 'select',
        options: [], 'nzMode': 'default',
        'datasource': '/assets/action.json'
      },
      {
        Controlname: 'Jump', Controltype: 'select',
        options: [], 'nzMode': 'default',
        'datasource': '/assets/jump.json'
      },
      {Controlname: 'Status', Controltype: 'textbox'},
      {Controlname: 'Nexttask', Controltype: 'select', options: [], 'nzMode': 'default'},
      {Controlname: 'Backtask', Controltype: 'select', options: [], 'nzMode': 'default'}
    ];

    this.manexecutercolnames = [
      {Controlname: 'No', Controltype: 'textbox'},
      {
        Controlname: 'Taskexecuter', Controltype: 'select',
        options: [], 'nzMode': 'default'
      },
      {Controlname: 'Expression', Controltype: 'textbox'}
    ];

    this.switchformcolnames = [
      {Controlname: 'Taskid', Controltype: 'textbox'},
      {Controlname: 'Taskname', Controltype: 'textbox'},
      {
        Controlname: 'Skip', Controltype: 'checkboxgroup',
        checkboxgroup: [],
        'datasource': '/assets/skip.json'
      }
    ];

    this.switchactioncolnames = [
      {Controlname: 'Nos', Controltype: 'textbox'},
      {
        Controlname: 'Conditions', Controltype: 'select',
        options: [], 'nzMode': 'default'
      },
      {
        Controlname: 'Functions',
        Controltype: 'select',
        options: [], 'nzMode': 'default',
        'datasource': '/assets/functions.json'
      },
      {Controlname: 'Valuee', Controltype: 'textbox'},
      {
        Controlname: 'Jump', Controltype: 'select',
        options: [], 'nzMode': 'default',
        'datasource': '/assets/jump.json'
      },
      {Controlname: 'Statuss', Controltype: 'textbox'},
      {Controlname: 'Nexttask', Controltype: 'select', options: [], 'nzMode': 'default'},
      {Controlname: 'Backtask', Controltype: 'select', options: [], 'nzMode': 'default'}
    ];


    this.es.getflowtemplate().subscribe(data => {

      this.flowtemplateoptions = data;
    });
    this.manformdata = {'Concurrent': '0'};
  }

  switchtask(taskid) {
    this.tasktype = taskid;

  }

  switchtask2(menu) {
    console.log(menu);
    // console.log(menu.Tasktype);
    this.tasktype = menu.Tasktype;
    if (menu.Tasktype == 'man') {
      this.manactiondata = menu.actiondata;
      this.manexecuterdata = menu.executerdata;

      this.manformdata = menu;
      this.manformcolnames[2].checkboxgroup[0].checked = menu.Supportskip;
      this.manformcolnames[2].checkboxgroup[1].checked = menu.Sendmessage;
    }
    if (menu.Tasktype == 'switch') {
      this.switchactiondata = menu.actiondata;
      this.switchformdata = menu;
      this.switchformcolnames[2].checkboxgroup[0].checked = menu.Supportskip;
      this.switchformcolnames[2].checkboxgroup[1].checked = menu.Sendmessage;
    }

  }

  dosubmit(event) {
    console.log(this.tasktype);
    this.manformdata['Flowtemplateid'] = this.selectedflowtemplateid;
    console.log(this.manformdata);
    console.log(this.manactiondata);
    console.log(this.manexecuterdata);
    this.switchformdata['Flowtemplateid'] = this.selectedflowtemplateid;
    console.log(this.switchformdata);
    console.log(this.switchactiondata);

    if (event == 'Save') {
      console.log('event==\'save\'');
      if (this.manformdata.Concurrent == '2') {
        for (const manactiondata1 of this.manactiondata) {
          if (manactiondata1.Action == 'next') {
            manactiondata1.Nexttask = this.arraytostring(manactiondata1.Nexttask);
            break;
          }
        }
      }
      console.log(this.manformcolnames[2].checkboxgroup);
      if (this.tasktype == 'man') {
        if (this.manformcolnames[2].checkboxgroup[0].checked != 'undefined') {
          this.manformdata.Supportskip = this.manformcolnames[2].checkboxgroup[0].checked;
        } else {
          this.manformdata.Supportskip = false;
        }
        if (this.manformcolnames[2].checkboxgroup[1].checked != 'undefined') {
          this.manformdata.Sendmessage = this.manformcolnames[2].checkboxgroup[1].checked;
        } else {
          this.manformdata.Sendmessage = false;
        }
      } else {
        if (this.switchformcolnames[2].checkboxgroup[0].checked != 'undefined') {
          this.switchformdata.Supportskip = this.switchformcolnames[2].checkboxgroup[0].checked;
        } else {
          this.switchformdata.Supportskip = false;
        }
        if (this.switchformcolnames[2].checkboxgroup[1].checked != 'undefined') {
          this.switchformdata.Sendmessage = this.switchformcolnames[2].checkboxgroup[1].checked;
        } else {
          this.switchformdata.Sendmessage = false;
        }
      }

      this.es.saveflowtask(this.tasktype, this.manformdata, this.manactiondata, this.manexecuterdata, this.switchformdata, this.switchactiondata).subscribe(data => {

        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.switchtemplate();
        } else {
          return;
        }


      });


    }
    if (event == 'Delete') {

      if (this.tasktype == 'man') {
        if (this.manformdata.Taskid == 1 || this.manformdata.Taskid == 999) {
          this.message.info('1 and 999 are not permitted to delete');
          return;
        }

      }
      if (this.tasktype == 'switch') {
        if (this.switchformdata.Taskid == 1 || this.switchformdata.Taskid == 999) {
          this.message.info('1 and 999 are not permitted to delete');
          return;
        }

      }
      if (this.tasktype == 'man') {
        this.selectedtaskid = this.manformdata.Taskid;
      } else {
        this.selectedtaskid = this.switchformdata.Taskid;
      }
      this.es.deleteflowtaskid(this.selectedflowtemplateid, this.selectedtaskid).subscribe(data => {
        this.message.info('submit==>' + data.status);

        if (data.status == 'ok') {
          this.switchtemplate();
        } else {
          return;
        }
      });


    }

  }

  gettaskidoptions(menudata) {
    const taskidoptions: any[] = [];
    for (const menu of menudata) {
      taskidoptions.push({'label': menu.Taskname, 'value': menu.Taskid});
    }
    console.log(taskidoptions);
    return taskidoptions;
  }

  updateoptions(colnames, optios) {
    for (const colname of colnames) {
      if (colname.Controltype == 'select' && colname.Controlname.indexOf('task') >= 0) {
        colname.options = optios;
      }
    }
  }

  updateconditions() {
    this.es.getflowtemplateitem(this.selectedflowtemplateid).subscribe(data => {
      const conditionoptions: any[] = [];
      for (const condition of data) {
        conditionoptions.push({'label': condition.Varyname, 'value': condition.Vary});
      }
      for (const colname of this.switchactioncolnames) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Conditions') {
          colname.options = conditionoptions;
        }
      }

    });
  }

  updateexecuter() {
    this.es.getexecuterjson().subscribe(data => {

      for (const colname of this.manexecutercolnames) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Taskexecuter') {
          colname.options = data;
        }
      }

    });
  }

  switchtemplate() {
    this.tasktype = '';
    this.flowname = this.selectedflowtemplateid;
    this.es.getflowtask(this.selectedflowtemplateid).subscribe(data => {
      this.menudata = [];
      // this.manactiondata=[];
      // this.manexecuterdata=[];
      // this.manformdata={};
      // this.switchactiondata=[];
      // this.switchformdata={};

      console.log(data);
      for (const data1 of data) {
        for (const action of data1.actions) {
          if (action.Action == 'next') {
            action.Nexttask = action.Nexttask.split(',');
            break;
          }
        }
        this.menudata.push(
          {
            'Tasktype': data1.flowtask.Tasktype, 'Taskid': data1.flowtask.Taskid,
            'Taskname': data1.flowtask.Taskname, 'Supportskip': data1.flowtask.Supportskip,
            'Sendmessage': data1.flowtask.Sendmessage, 'Samepersontask': data1.flowtask.Samepersontask,
            'Nopersontask': data1.flowtask.Nopersontask, 'Concurrent': data1.flowtask.Concurrent,
            'actiondata': data1.actions, 'executerdata': data1.executers, 'Lasttaskid': ''
          });
      }
      const options = this.gettaskidoptions(this.menudata);
      this.updateoptions(this.manformcolnames, options);
      this.updateoptions(this.manactioncolnames, options);
      this.updateoptions(this.switchactioncolnames, options);
      this.updateconditions();
      this.updateexecuter();
      this.sortmenudata();


    });

  }

  sortmenudata() {
    this.menudata.sort(
      (value1, value2) => {
        if (parseInt(value1.Taskid) > parseInt(value2.Taskid)) {
          return 1;
        }
        if (parseInt(value1.Taskid) < parseInt(value2.Taskid)) {
          return -1;
        }
        return 0;

      }
    );
  }

  formdatachange(event) {
    console.log(this.manformdata.Concurrent);
    if (event == 'Concurrent') {
      for (const colname of this.manactioncolnames) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Nexttask') {
          if (this.manformdata.Concurrent == '2') {
            colname.ismultiple = true;
            break;
          } else {
            colname.ismultiple = false;
            break;
          }
        }
      }
    }

  }

  arraytostring(arry): string {
    let tostring = '';
    for (let i = 0; i < arry.length; i++) {
      if (i > 0) {
        tostring = tostring + ',';
      }

      if (arry[i] != '') {
        tostring = tostring + arry[i];
      }
    }
    return tostring;
  }

}
