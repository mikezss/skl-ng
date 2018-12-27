import {Component, OnInit} from '@angular/core';
import {UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-flowdefine-man',
  templateUrl: './flowdefine-man.component.html',
  styleUrls: ['./flowdefine-man.component.css']
})
export class FlowdefineManComponent implements OnInit {
  formdata: any[] = [];
  actiondata: any[] = [];
  executerdata: any[] = [];


  formcolnames: any[] = [];
  actioncolnames: any[] = [];
  executercolnames: any[] = [];


  formfileList: UploadFile[] = [];
  actionfileList: UploadFile[] = [];
  executerfileList: UploadFile[] = [];

  constructor() {
  }

  ngOnInit() {
    this.formcolnames = [
      {Controlname: 'Taskid', Controltype: 'textbox'},
      {Controlname: 'Taskname', Controltype: 'textbox'},
      {
        Controlname: 'Skip', Controltype: 'checkboxgroup',
        checkboxgroup: [
          {label: 'supporskip', value: '0', checked: false},
          {label: 'sendmessage', value: '1', checked: false}
        ]
      },
      {
        Controlname: 'Concurrent', Controltype: 'radiogroup',
        radiogroup: [{label: 'nothing', value: '0', checked: false},
          {label: 'countersign', value: '1', checked: false},
          {label: 'split', value: '2', checked: false}
        ]
      },
      {Controlname: 'Samepersontask', Controltype: 'select', options: [{label: 'samepersontask', value: 'nexttaskid'}]},
      {Controlname: 'Nopersontask', Controltype: 'select', options: [{label: 'nopersontask', value: 'nexttaskid'}]}
    ];
    this.actioncolnames = [
      {
        Controlname: 'Action', Controltype: 'select',
        options: [{label: 'save', value: 'save'}, {label: 'submit', value: 'submit'},
          {label: 'return', value: 'return'}, {label: 'pass', value: 'pass'},
          {label: 'stop', value: 'stop'}, {label: 'next', value: 'next'}]
      },
      {
        Controlname: 'Jump', Controltype: 'select',
        options: [{label: 'forward', value: 'forward'}, {label: 'backward', value: 'backward'},
          {label: 'pause', value: 'pause'}, {label: 'stop', value: 'stop'}]
      },
      {Controlname: 'Status', Controltype: 'textbox'},
      {Controlname: 'Nexttask', Controltype: 'select', options: [{label: 'nexttaskname', value: 'nexttaskid'}]},
      {Controlname: 'Backtask', Controltype: 'select', options: [{label: 'backtaskname', value: 'backtaskid'}]}
    ];
    this.executercolnames = [
      {Controlname: 'No', Controltype: 'textbox'},
      {
        Controlname: 'Taskexecuter', Controltype: 'select',
        options: [{label: 'manager', value: '0'}, {label: 'vicemanager', value: '1'},
          {label: 'user', value: '2'}, {label: 'usergroup', value: '3'}]
      },
      {Controlname: 'Expression', Controltype: 'textbox'}
    ];
  }

  dosubmit(event) {
    console.log(event);
    console.log(this.formdata);
    console.log(this.actiondata);
    console.log(this.executerdata);

  }


}
