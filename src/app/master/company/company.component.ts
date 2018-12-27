import {Component, OnInit} from '@angular/core';
import {MasterService} from '../master.service';
import {NzMessageService} from 'ng-zorro-antd';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  listdata: any[] = [];
  listcolnames: any[] = [];

  constructor(private ls: LoginService, private cs: MasterService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.listcolnames = [{'Controlname': 'Companycode', 'Controltype': 'textbox'},
      {'Controlname': 'Companyname', 'Controltype': 'textbox'},
      {'Controlname': 'Companyshortname', 'Controltype': 'textbox'},
      {'Controlname': 'Manager', 'Controltype': 'textbox'},
      {'Controlname': 'Telphone', 'Controltype': 'textbox'},
      {'Controlname': 'Fax', 'Controltype': 'textbox'},
      {'Controlname': 'Email', 'Controltype': 'textbox'},
      {'Controlname': 'Address', 'Controltype': 'textbox'},
      {'Controlname': 'Postcode', 'Controltype': 'textbox'},
      {
        'Controlname': 'Companytype',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'companytype'}
      },
      {'Controlname': 'Exportflag', 'Controltype': 'select', 'options': [], 'nzMode': 'default', 'datasource': '/assets/yesno.json'}];
    this.cs.getcompany().subscribe(response => {
      this.listdata = response;
    });
  }

  savecompany(event) {
    console.log(this.listdata);
    this.cs.savecompany(this.listdata).subscribe(data => {
      console.log(data);
      this.message.info('submit==>' + data.status);
    });
  }

  listdatachange(event) {
    console.log(event);
  }

}
