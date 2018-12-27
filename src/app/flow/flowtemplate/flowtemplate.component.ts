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
import {NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-flowtemplate',
  templateUrl: './flowtemplate.component.html',
  styleUrls: ['./flowtemplate.component.css']
})
export class FlowtemplateComponent implements OnInit {
  isVisiblemodal = false;
  copytemplateid = '';
  copytemplatename = '';
  formcolnames: any[] = [];
  formdata: any = {};
  formfileList: UploadFile[] = [];
  actiondata: any[] = [];
  actioncolnames: any[] = [];
  actionfileList: UploadFile[] = [];


  nodes = [
    new NzTreeNode({
      title: 'flow template',
      key: 'rootflowtemplate'
    })
  ];

  constructor(private fs: FlowService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Flowtemplateid', 'Controltype': 'textbox'},
      {'Controlname': 'Flowtemplatename', 'Controltype': 'textbox'},
      {'Controlname': 'Flowcontent', 'Controltype': 'textbox'},
      {'Controlname': 'Flowinstidcol', 'Controltype': 'textbox'},
      {'Controlname': 'Flowstatuscol', 'Controltype': 'textbox'},

    ];
    this.actioncolnames = [
      {'Controlname': 'Vary', 'Controltype': 'textbox'},
      {'Controlname': 'Varyname', 'Controltype': 'textbox'},
      {
        'Controlname': 'Varytype', 'Controltype': 'select',
        'options': [], 'nzMode': 'default', 'datasource': '/assets/varytype.json'
      },
      {'Controlname': 'Varyvalue', 'Controltype': 'textbox'}
    ];
    this.searchflowtemplate();
    // this.nodes[0].addChildren([{title:'child1',key:'child1',isLeaf:true},{title:'child2',key:'child2',isLeaf:true}]);
  }

  dosubmit(event) {
    console.log(event);
    console.log(this.formdata);
    console.log(this.actiondata);
    if (event == 'Save') {
      this.fs.saveflowtemplate(this.formdata, this.actiondata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.searchflowtemplate();
        }
      });
    }
    if (event == 'Delete') {
      this.fs.deleteflowtemplate(this.formdata.Flowtemplateid).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.searchflowtemplate();
        }
        this.formdata = {};
        this.actiondata = [];
      });
    }
    if (event == 'Copy') {
      this.isVisiblemodal = true;
    }

  }

  cancelmodal() {
    this.isVisiblemodal = false;
  }

  confirmmodal() {
    this.fs.copyflowtemplate(this.formdata.Flowtemplateid, this.copytemplateid, this.copytemplatename).subscribe(data => {
      console.log(data);
      this.message.info('submit==>' + data.status);
      if (data.status == 'ok') {
        this.searchflowtemplate();
        this.isVisiblemodal = false;
      }
    });
  }

  mouseAction(name: string, e: any): void {

    console.log(name);
    console.log(e);
    if (e.node.isLeaf == true) {
      console.log(e.node.key);
      this.fs.getflowtemplatebyid(e.node.key).subscribe(data => {
        this.formdata = data;
      });
      this.fs.getflowtemplateitem(e.node.key).subscribe(data => {
        this.actiondata = data;
      });
    } else {
      this.formdata = [];
      this.actiondata = [];
    }
  }

  searchflowtemplate() {
    this.fs.getflowtemplate().subscribe(data => {
      this.nodes[0].clearChildren();
      for (let data1 of data) {
        this.nodes[0].addChildren([{title: data1.Flowtemplatename, key: data1.Flowtemplateid, isLeaf: true}]);
      }
    });
  }

}
