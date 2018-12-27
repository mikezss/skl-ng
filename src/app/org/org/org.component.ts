import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {RoleService} from '../../role/role.service';
import {MasterService} from '../../master/master.service';
import {OrgService} from '../org.service';
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
  selector: 'app-org',
  templateUrl: './org.component.html',
  styleUrls: ['./org.component.css']
})
export class OrgComponent implements OnInit {
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  selectedkey = '';
  authorizationtabtitle = 'please select role to authorization';
  tabindex: any = 1;
  searchValue = '';
  formcolnames: any[] = [];
  formdata: any = {};
  actioncolnames: any[] = [];
  actiondata: any[] = [];
  listcolnames: any[] = [];
  listdata: any[] = [];
  nodes = [];
  rolenodes = [];
  ExpandedOrgKeys: any[] = [];

  constructor(private ls: LoginService, private os: OrgService, private ms: MasterService, private rs: RoleService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Orgid', 'Controltype': 'textbox'},
      {'Controlname': 'Orgname', 'Controltype': 'textbox'},
      {
        'Controlname': 'Parentid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/master/getallorgoptions'
      },
      {'Controlname': 'Orglevel', 'Controltype': 'label'},
      {'Controlname': 'Remark', 'Controltype': 'textarea'}

    ];
    this.actioncolnames = [
      {
        'Controlname': 'Userid',
        'Controltype': 'select',
        'options': [],
        'datasource': this.ls.api_url + '/master/getleaders',
        'nzMode': 'default'
      },
      {
        'Controlname': 'Leadertype',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': '/assets/leadertype.json'
      }
    ];
    this.listcolnames = [
      {'Controlname': 'Userid', 'Controltype': 'label'},
      {'Controlname': 'Username', 'Controltype': 'label'}
    ];

    this.rs.getrolesjson().subscribe(rolesdata => {
      console.log(rolesdata);
      this.rolenodes = rolesdata;


    });
    this.refresh();
  }

  dosubmit(event) {

    console.log(event);
    console.log(this.formdata);
    let leadersdata: any[] = [];
    for (let lds of this.actiondata) {
      leadersdata.push({'Orgid': this.formdata.Orgid, 'Userid': lds.Userid, 'Leadertype': lds.Leadertype});
    }
    if (event == 'save') {
      this.os.saveorgs(this.formdata, leadersdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {
          this.refresh();
        }
      });
    } else {
      if (this.formdata.Orgid == 'root') {
        this.message.info('root not permitted to delete!');
        return;
      }
      this.os.deleteorgbyid(this.formdata.Orgid).subscribe(data => {
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
      this.ExpandedOrgKeys.push(this.selectedkey);
      this.os.getusersbyorgid(e.node.key).subscribe(data => {
        this.listdata = data;
      });


      this.os.getorgbyid(e.node.key).subscribe(data => {
        this.formdata = data.org;
        this.actiondata = data.orgleader;
        this.authorizationtabtitle = e.node.title + ' \u6388\u6743';

      });
      this.os.getorgpriviledge(e.node.key).subscribe(data => {
        console.log(data);
        this.rolenodes = data;

      });

    }

  }

  refresh() {
    this.os.getorgsjson().subscribe(data => {
      console.log(data);
      this.nodes = data;
    });
  }

  saveorgpriviledge() {
    if (this.selectedkey == '') {
      this.message.info('please select role first');
      return;
    }
    let checkednodelist = this.nzTree.getCheckedNodeList();
    console.log('checkedNodes: %o', checkednodelist);
    if (checkednodelist.length == 0) {
      this.os.deleteorgpriviledge(this.selectedkey).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
      return;
    }
    let conditionoptions: any[] = [];
    this.loopCheckedNodeList(checkednodelist, conditionoptions);
    this.os.saveorgpriviledge(conditionoptions).subscribe(data => {
      console.log(data);
      this.message.info('submit==>' + data.status);
      if (data.status == 'ok') {
        this.refresh();
      }
    });
  }

  loopCheckedNodeList(chknodelist, cdtionoptions) {

    for (let condition of chknodelist) {
      cdtionoptions.push({'Orgid': this.selectedkey, 'Roleid': condition.key});
      if (condition.children != '') {
        this.loopCheckedNodeList(condition.children, cdtionoptions);
      }
    }
  }

}
