import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {RoleService} from '../role.service';
import {MasterService} from '../../master/master.service';
import {LoginService} from '../../login/login.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';
import {NzTreeComponent, NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  @ViewChild('nzTreerole') nzTreerole: NzTreeComponent;
  allusers: any[] = [];
  selectedkey = '';
  authorizationtabtitle = 'please select role to authorization';
  userroletabtitle = 'please select role to add user';
  tabindex: any = 1;
  searchValue;
  formcolnames: any[] = [];
  formdata: any = {};
  listcolnames: any[] = [];
  listdata: any[] = [];
  nodes = [];
  modualnodes = [];

  constructor(private ls: LoginService, private ms: MasterService, private rs: RoleService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Roleid', 'Controltype': 'textbox'},
      {'Controlname': 'Rolename', 'Controltype': 'textbox'},
      {
        'Controlname': 'Parentid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/master/getallroleoptions'
      },
      {'Controlname': 'Rolelevel', 'Controltype': 'label'},
      {'Controlname': 'Remark', 'Controltype': 'textarea'}

    ];
    this.listcolnames = [
      {
        'Controlname': 'Userid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/master/getalluseroptions'
      }
    ];
    this.ms.getmodualsjson().subscribe(modualsdata => {
      console.log(modualsdata);
      this.modualnodes = modualsdata;
    });
    this.refresh();
  }

  dosubmit(event) {
    if (this.formdata.Roleid == 'root') {
      this.message.info('root not permitted to modify!');
      return;
    }
    console.log(event);
    console.log(this.formdata);

    if (event == 'save') {
      this.rs.saveroles(this.formdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });
    } else {
      this.rs.deleterolebyid(this.formdata.Roleid).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });
    }
  }

  mouseAction(name: string, e: any): void {
    if (e.node != null) {

      this.selectedkey = e.node.key;
      this.rs.getrolebyid(e.node.key).subscribe(data => {
        this.formdata = data;
        this.authorizationtabtitle = e.node.title + ' \u6388\u6743';
        this.userroletabtitle = e.node.title + ' \u5173\u8054\u7528\u6237';
      });
      this.rs.getrolepriviledge(e.node.key).subscribe(data => {
        console.log(data);
        this.modualnodes = data;
      });
      this.rs.getuserrole({'Roleid': e.node.key}).subscribe(data => {
        this.listdata = data;
      });
    }
  }

  refresh() {
    this.rs.getrolesjson().subscribe(roledata => {
      console.log(roledata);
      this.nodes = roledata;
    });
  }

  saverolepriviledge() {
    if (this.selectedkey == '') {
      this.message.info('please select role first');
      return;
    }
    const checkednodelist = this.nzTreerole.getCheckedNodeList();
    console.log('checkedNodes: %o', checkednodelist);
    if (checkednodelist.length == 0) {
      this.rs.deleterolepriviledge(this.selectedkey).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
      return;
    }
    const conditionoptions: any[] = [];
    this.loopCheckedNodeList(checkednodelist, conditionoptions);
    this.rs.saverolepriviledge(conditionoptions).subscribe(data => {
      console.log(data);
      this.message.info('submit==>' + data.status);
      if (data.status == 'ok') {
        this.refresh();
      }
    });
  }

  loopCheckedNodeList(chknodelist, cdtionoptions) {

    for (const condition of chknodelist) {
      cdtionoptions.push({'Roleid': this.selectedkey, 'Modualid': condition.key});
      if (condition.children != '') {
        this.loopCheckedNodeList(condition.children, cdtionoptions);

      }
    }
  }

  saveuserrole(event) {
    console.log(event);
    console.log(this.listdata);
    const listdata2: any[] = [];
    for (const condition of this.listdata) {
      listdata2.push({'Roleid': this.selectedkey, 'Userid': condition.Userid});
    }
    if (this.listdata.length == 0) {
      listdata2.push({'Roleid': this.selectedkey, 'Userid': ''});
    }
    console.log(listdata2);
    if (event == 'save') {
      this.rs.saveuserrole(listdata2).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });
    }
  }

}
