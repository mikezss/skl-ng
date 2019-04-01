import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MasterService} from '../master.service';
import {FlowService} from '../../flow/flow.service';
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
  selector: 'app-modual',
  templateUrl: './modual.component.html',
  styleUrls: ['./modual.component.css']
})
export class ModualComponent implements OnInit {
  searchValue;
  selectedkey = '';
  tabindex: any = 0;
  modualmanagementtabtitle = 'management';
  modualtemplatetabtitle = 'bind template';
  formcolnames: any[] = [];
  formdata: any = {};
  modualtemplateformcolnames: any[] = [];
  modualtemplateformdata: any = {};

  nodes = [];

  constructor(private ls: LoginService, private fs: FlowService, private ms: MasterService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Modualid', 'Controltype': 'textbox'},
      {'Controlname': 'Modualname', 'Controltype': 'textbox'},
      {
        'Controlname': 'Parentid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/master/getallmodualoptions'
      },
      {'Controlname': 'Url', 'Controltype': 'textbox'},
      {'Controlname': 'Remark', 'Controltype': 'textarea'},
      {'Controlname': 'Displayno', 'Controltype': 'number', 'minvalue': 1, 'maxvalue': 999, 'stepvalue': 1}

    ];
    this.modualtemplateformcolnames = [

      {
        'Controlname': 'Flowtemplateid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/flow/getflowtemplateoptions'
      },
      {'Controlname': 'Tablename', 'Controltype': 'textbox'}
    ];
    this.refresh();


  }

  dosubmit(event) {
    console.log(event);
    console.log(this.formdata);

    if (event == 'Save') {
      this.ms.savemoduals(this.formdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });
    } else {
      this.ms.deletemodualbyid(this.formdata.Modualid).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });

    }

  }

  mouseAction(name: string, e: any): void {

    console.log(name);
    console.log(e);

    console.log(e.node.origin.key);
    console.log(e.node.origin.title);
    console.log(e.node.origin.url);
    this.selectedkey = e.node.key;
    this.ms.getmodualbyid(e.node.key).subscribe(data => {
        this.formdata = data;
        this.modualmanagementtabtitle = e.node.origin.title + ' to manage';
        this.modualtemplatetabtitle = e.node.origin.title + ' to bind template';
      }
    );
    this.ms.getmodualtemplatebyid(this.selectedkey).subscribe(data => {
      this.modualtemplateformdata = data;

    });

  }

  refresh() {
    this.ms.getmodualsjson().subscribe(data => {
      console.log(data);
      this.nodes = data;
    });
  }

  savemodualtemplate(event) {


    if (event == 'Save') {
      this.ms.savemodualtemplate({
        'Modualid': this.selectedkey,
        'Flowtemplateid': this.modualtemplateformdata.Flowtemplateid,
        'Tablename': this.modualtemplateformdata.Tablename
      }).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);

      });
    } else {
      this.ms.deletemodualtemplatebyid(this.selectedkey).subscribe(data => {
        console.log(data);
        if (data.status == 'ok') {
          this.modualtemplateformdata = [];
        }

        this.message.info('submit==>' + data.status);

      });

    }

  }

}
