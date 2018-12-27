import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {RoleService} from '../../role/role.service';
import {MasterService} from '../../master/master.service';
import {LoginService} from '../../login/login.service';
import {UserService} from '../user.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';
import {NzTreeComponent, NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-usergroup',
  templateUrl: './usergroup.component.html',
  styleUrls: ['./usergroup.component.css']
})
export class UsergroupComponent implements OnInit {
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  allusers: any[] = [];
  selectedkey = '';
  usergroupmanagementtitle = 'please select group';
  authorizationtabtitle = 'please select group to authorization';
  usergrouptabtitle = 'please select group to add user';
  tabindex: any = 1;
  searchValue = '';

  formcolnames: any[] = [];
  formdata: any = {};

  listcolnames: any[] = [];
  listdata: any[] = [];

  nodes = [];
  rolenodes = [];

  constructor(private ls: LoginService, private us: UserService, private ms: MasterService, private rs: RoleService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Groupid', 'Controltype': 'textbox'},
      {'Controlname': 'Groupname', 'Controltype': 'textbox'},
      {'Controlname': 'Parentid', 'Controltype': 'select', 'options': [], 'nzMode': 'default'},
      {'Controlname': 'Grouplevel', 'Controltype': 'label'},
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

    this.rs.getrolesjson().subscribe(rolesdata => {
      console.log(rolesdata);
      this.rolenodes = rolesdata;


    });
    this.ms.getalluser().subscribe(data => {
      const conditionoptions: any[] = [];
      // conditionoptions.push({"label":"root","value":"root"});
      for (const condition of data) {
        conditionoptions.push(condition.Userid);
      }
      console.log(conditionoptions);
      for (const colname of this.listcolnames) {
        if (colname.Controltype == 'atcomplete' && colname.Controlname == 'Userid') {
          colname.datasource = conditionoptions;
          this.allusers = conditionoptions;
          break;
        }
      }
    });
    this.refresh();
  }

  dosubmit(event) {
    if (this.formdata.Groupid == 'root') {
      this.message.info('root not permitted to modify!');
      return;
    }
    console.log(event);
    console.log(this.formdata);

    if (event == 'save') {
      this.us.savegroups(this.formdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });
    } else {
      this.us.deletegroupbyid(this.formdata.Groupid).subscribe(data => {
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

      this.us.getgroupbyid(e.node.key).subscribe(data => {
        this.formdata = data;
        this.usergroupmanagementtitle = e.node.title + ' \u7ba1\u7406';
        this.authorizationtabtitle = e.node.title + ' \u6388\u6743';
        this.usergrouptabtitle = e.node.title + ' \u5173\u8054\u7528\u6237';

      });

      this.us.getgrouppriviledge(e.node.key).subscribe(data => {
        console.log(data);
        this.rolenodes = data;

      });
      this.us.getusergroup({'Groupid': e.node.key}).subscribe(data => {
        this.listdata = data;

      });

    }

  }

  refresh() {
    this.us.getgroupsjson().subscribe(data => {
      console.log(data);
      this.nodes = data;


    });
    this.us.getgroups().subscribe(data => {

      console.log(data);
      const conditionoptions: any[] = [];
      // conditionoptions.push({"label":"root","value":"root"});
      for (const condition of data) {
        conditionoptions.push({'label': condition.Groupname, 'value': condition.Groupid});
      }
      for (const colname of this.formcolnames) {
        if (colname.Controltype == 'select' && colname.Controlname == 'Parentid') {
          colname.options = conditionoptions;
          break;
        }
      }

    });
  }

  savegrouppriviledge() {
    if (this.selectedkey == '') {
      this.message.info('please select role first');
      return;
    }
    const checkednodelist = this.nzTree.getCheckedNodeList();
    console.log('checkedNodes: %o', checkednodelist);
    if (checkednodelist.length == 0) {
      this.us.deletegrouppriviledge(this.selectedkey).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
      return;
    }
    const conditionoptions: any[] = [];
    this.loopCheckedNodeList(checkednodelist, conditionoptions);
    this.us.savegrouppriviledge(conditionoptions).subscribe(data => {
      console.log(data);
      this.message.info('submit==>' + data.status);
      if (data.status == 'ok') {
        this.refresh();
      }
    });
  }

  loopCheckedNodeList(chknodelist, cdtionoptions) {

    for (const condition of chknodelist) {
      cdtionoptions.push({'Groupid': this.selectedkey, 'Roleid': condition.key});
      if (condition.children != '') {
        this.loopCheckedNodeList(condition.children, cdtionoptions);
      }
    }
  }

  saveusergroup(event) {
    console.log(event);
    console.log(this.listdata);
    const listdata2: any[] = [];
    for (const condition of this.listdata) {
      listdata2.push({'Groupid': this.selectedkey, 'Userid': condition.Userid});
    }
    console.log(listdata2);
    if (event == 'save') {
      this.us.saveusergroup(listdata2).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });
    }
  }

  listdatachange(event) {

  }

}
