import {Component, OnInit, ViewChild} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MasterService} from '../../master/master.service';
import {UserService} from '../user.service';
import {OrgService} from '../../org/org.service';
import {RoleService} from '../../role/role.service';
import {LoginService} from '../../login/login.service';
import {UploadFile} from 'ng-zorro-antd';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';
import {NzTreeComponent, NzTreeNode} from 'ng-zorro-antd';

@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.css']
})
export class UsermanageComponent implements OnInit {
  mode = 'a';
  tabindex: any = 0;
  @ViewChild('nzTree') nzTree: NzTreeComponent;
  selectedkey = '';
  searchValue = '';
  authorizationtabtitle = 'please select user to authorization';

  queryitems: any[] = [];
  querydata: any = {};

  listdata: any[] = [];
  listcolnames: any[] = [];

  formcolnames: any[] = [];
  formdata: any = {};

  importformcolnames: any[] = [];
  importformdata: any = {};

  rolenodes = [];

  constructor(private ls: LoginService, private rs: RoleService, private us: UserService, private os: OrgService, private ms: MasterService, private message: NzMessageService, private router: Router) {
  }

  ngOnInit() {
    this.queryitems = [
      {'Controlname': 'Userid', 'Controltype': 'textbox'},
      {'Controlname': 'Username', 'Controltype': 'textbox'},
      {
        'Controlname': 'Userlevel', 'Controltype': 'select',
        'options': [], 'nzMode': 'default', 'datasource': '/assets/userlevel.json'
      },
      {
        'Controlname': 'Expired',
        'Controltype': 'radiogroup',
        'radiogroup': [],
        'datasource': '/assets/expired.json'
      }
      ,
      {Controlname: 'Orgid', Controltype: 'treeselect', 'nodes': []}
    ];
    this.listcolnames = [
      {'Controlname': 'Userid', 'Controltype': 'label'},
      {'Controlname': 'Username', 'Controltype': 'label'},
      {'Controlname': 'Userlevel', 'Controltype': 'label'},
      {'Controlname': 'Orgid', 'Controltype': 'label'},
      {'Controlname': 'Postid', 'Controltype': 'label'},
      {'Controlname': 'View', 'Controltype': 'linkAction'},
      {'Controlname': 'Edit', 'Controltype': 'linkAction'},
      {'Controlname': 'Resetpassword', 'Controltype': 'linkAction'},
      {'Controlname': 'Authorization', 'Controltype': 'linkAction'}
    ];
    this.formcolnames = [
      {'Controlname': 'Userid', 'Controltype': 'textbox'},
      {'Controlname': 'Username', 'Controltype': 'textbox'},
      {
        'Controlname': 'Userlevel', 'Controltype': 'select',
        'options': [], 'nzMode': 'default', 'datasource': '/assets/userlevel.json'
      },
      {'Controlname': 'Expireddate', 'Controltype': 'datepicker'},
      {'Controlname': 'Loginip', 'Controltype': 'textbox'},
      {
        'Controlname': 'Postid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'post'}
      },
      {'Controlname': 'Email', 'Controltype': 'textbox'},
      {'Controlname': 'Remark', 'Controltype': 'textarea'},
      {'Controlname': 'Orgid', 'Controltype': 'treeselect', 'nodes': []},
      {'Controlname': 'Isleader', 'Controltype': 'checkbox'},
    ];
    this.importformcolnames = [
      {
        'Controlname': 'Userfile',
        'Controltype': 'upload',
        'ismultiple': true,
        'limit': true,
        'limitfileqty': 1,
        'fileList': [],
        'filesize': 75,
        'filetype': 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    ];
    let nodes = [];
    this.os.getorgsjson().subscribe(data => {
      nodes = data;
      for (const colname of this.queryitems) {
        if (colname.Controltype == 'treeselect' && colname.Controlname == 'Orgid') {
          colname.nodes = nodes;
          break;
        }
      }
      for (const colname of this.formcolnames) {
        if (colname.Controltype == 'treeselect' && colname.Controlname == 'Orgid') {
          colname.nodes = nodes;
          break;
        }
      }
    });
  }

  getquery(event) {
    if (event == 'reset') {
      this.reset();
    } else {
      console.log(event);
      console.log(this.queryitems);
      this.ms.getuser(this.querydata).subscribe(data => {
        console.log(data);
        this.listdata = data;
        /*for (let ld of this.listdata) {
          ld.Editable = true;
          ld.key = i;
        }*/
        this.listdata.forEach((val, idx, array) => {
          // val: 当前值
          val.Editable = true;
          // idx：当前index
          val.key = String(idx) ;
          // array: Array
        });
        console.log(this.listdata);
      });
    }
  }

  edit(data) {
    console.log(data);


    if (data.colname == 'View' || data.colname == 'Edit') {
      if (data.colname == 'View') {
        this.mode = 's';
      }
      if (data.colname == 'Edit') {
        this.mode = 'a';
      }
      this.selectedkey = data.data.Userid;
      this.authorizationtabtitle = data.data.Userid + ' \u6388\u6743';
      this.formdata = data.data;
      this.tabindex = 1;
      this.getuserpriveledge(this.selectedkey);

    }
    if (data.colname == 'Resetpassword') {
      this.selectedkey = data.data.Userid;
      this.router.navigate(['/passwordreset'], {queryParams: {'Userid': this.selectedkey}});
    }
    if (data.colname == 'Authorization') {
      this.selectedkey = data.data.Userid;
      this.authorizationtabtitle = data.data.Userid + ' \u6388\u6743';
      this.tabindex = 2;
      this.getuserpriveledge(this.selectedkey);
    }


  }

  dosubmit(event) {
    console.log(event);


    if (event == 'Save') {
      this.ms.saveuser(this.formdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {

        }
      });
    }
    if (event == 'Delete') {
      this.ms.deleteuserbyid({'Userid': this.formdata.Userid}).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
        if (data.status == 'ok') {

        }
      });

    }
    if (event == 'Upload') {
      console.log(this.importformcolnames[0].fileList);
      const formData = new FormData();
      formData.append('filelist', this.importformcolnames[0].fileList[0]);
      formData.append('filepath', 'static/files/tmp/');
      formData.append('renamefilename', 'false');


      this.ms.uploadfile(formData).subscribe(data => {
        if (data.status == 'ok') {
          this.ms.uploadusers({'Filepath': data.result}).subscribe(data => {
            this.message.info(data.status);
          });
        } else {
          this.message.info(data.result);
        }

      });
    }

  }

  saveuserpriviledge() {
    if (this.selectedkey == '') {
      this.message.info('please select role first');
      return;
    }
    const checkednodelist = this.nzTree.getCheckedNodeList();
    console.log('checkedNodes: %o', checkednodelist);
    if (checkednodelist.length == 0) {
      this.us.deleteuserpriviledge(this.selectedkey).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
      return;
    }
    const conditionoptions: any[] = [];
    this.loopCheckedNodeList(checkednodelist, conditionoptions);
    this.us.saveuserpriviledge(conditionoptions).subscribe(data => {
      console.log(data);
      this.message.info('submit==>' + data.status);
      if (data.status == 'ok') {
        // this.refresh();
      }
    });
  }

  loopCheckedNodeList(chknodelist, cdtionoptions) {

    for (const condition of chknodelist) {
      cdtionoptions.push({'Userid': this.selectedkey, 'Roleid': condition.key});
      if (condition.children != '') {
        this.loopCheckedNodeList(condition.children, cdtionoptions);
      }
    }
  }

  getuserpriveledge(selectedkey) {
    this.us.getuserrolesjson({'Userid': selectedkey}).subscribe(rolesdata => {
      console.log(rolesdata);
      this.rolenodes = rolesdata;
    });
  }

  reset() {
    this.querydata = {};
    this.listdata = [];
  }

  uploadcheck(event) {
    console.log(event);
    for (const colname of this.importformcolnames) {
      if (colname.Controltype == 'upload') {
        if (event.size / 1024 > colname.filesize) {
          this.message.info('permitted file size is :' + colname.filesize);
          break;
        }

        if (colname.fileList.length < colname.limitfileqty) {
          colname.fileList.push(event);
          break;
        }
      }
    }
    console.log(this.importformdata);

  }


}
