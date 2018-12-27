import {Component, OnInit} from '@angular/core';
import {UploadFile} from 'ng-zorro-antd';

@Component({
  selector: 'app-flowdefine-switch',
  templateUrl: './flowdefine-switch.component.html',
  styleUrls: ['./flowdefine-switch.component.css']
})
export class FlowdefineSwitchComponent implements OnInit {
  formdata: any[] = [];
  actiondata: any[] = [];
  formcolnames: any[] = [];
  formfileList: UploadFile[] = [];
  actioncolnames: any[] = [];
  actionfileList: UploadFile[] = [];

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
      }
    ];
    this.actioncolnames = [
      {Controlname: 'NO', Controltype: 'textbox'},
      {
        Controlname: 'Condition', Controltype: 'select',
        options: [{label: 'money', value: 'money'}]
      },
      {
        Controlname: 'Function', Controltype: 'select',
        options: [{label: '>=', value: '0'}, {label: '<=', value: '1'},
          {label: '>', value: '2'}, {label: '<', value: '3'}, {label: '=', value: '4'}]
      },
      {Controlname: 'Value', Controltype: 'textbox'},
      {
        Controlname: 'Jump', Controltype: 'select',
        options: [{label: 'forward', value: 'forward'}, {label: 'backward', value: 'backward'},
          {label: 'pause', value: 'pause'}, {label: 'stop', value: 'stop'}]
      },
      {Controlname: 'Status', Controltype: 'textbox'},
      {Controlname: 'Nexttask', Controltype: 'select', options: [{label: '', value: ''}]},
      {Controlname: 'Backtask', Controltype: 'select', options: [{label: '', value: ''}]}
    ];
  }

  dosubmit(event) {
    console.log(event);
    console.log(this.formdata);
    console.log(this.actiondata);


  }

}
