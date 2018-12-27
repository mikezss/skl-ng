import {Component, OnInit} from '@angular/core';
import {MasterService} from '../../master/master.service';
import {NzMessageService} from 'ng-zorro-antd';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent implements OnInit {

  formdata: any = {};
  formcolnames: any[] = [];

  constructor(private ls: LoginService, private ms: MasterService, private message: NzMessageService) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Userid', 'Controltype': 'atcomplete', 'datasource': []},
      {
        'Controlname': 'Sex', 'Controltype': 'radiogroup', 'radiogroup': [], 'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'sex'}
      },
      {'Controlname': 'Residence_addres', 'Controltype': 'textbox'},
      {
        'Controlname': 'Residence_type',
        'Controltype': 'radiogroup',
        'radiogroup': [],
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'residencetype'}
      },
      {'Controlname': 'Employeeid', 'Controltype': 'textbox'},
      {
        'Controlname': 'Marital_status',
        'Controltype': 'radiogroup',
        'radiogroup': [],
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'maritalstatus'}
      },
      {'Controlname': 'Native_place', 'Controltype': 'textbox'},
      {'Controlname': 'Birthday', 'Controltype': 'datepicker'},
      {'Controlname': 'School', 'Controltype': 'textbox'},
      {'Controlname': 'Major', 'Controltype': 'textbox'},
      {
        'Controlname': 'Degree',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'degree'}
      },
      {'Controlname': 'Idcard', 'Controltype': 'textbox'},
      {
        'Controlname': 'Country',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'country'}
      },
      {'Controlname': 'Work_date', 'Controltype': 'datepicker'},
      {'Controlname': 'Address', 'Controltype': 'textbox'},
      {'Controlname': 'Mobile', 'Controltype': 'textbox'},
      {'Controlname': 'Contact_way', 'Controltype': 'textbox'},
      {'Controlname': 'Contact_person', 'Controltype': 'textbox'},
      {'Controlname': 'Entrydate', 'Controltype': 'datepicker'},
      {'Controlname': 'English_name', 'Controltype': 'textbox'},
      {'Controlname': 'Professional_title', 'Controltype': 'textbox'},
      {'Controlname': 'Orgid', 'Controltype': 'label'},
      {
        'Controlname': 'Postid',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'post'}
      },
      {
        'Controlname': 'Carborrow_qualification', 'Controltype': 'radiogroup', 'radiogroup': [], 'datasource': '/assets/yesno.json'
      },
      {
        'Controlname': 'Rank',
        'Controltype': 'select',
        'options': [],
        'nzMode': 'default',
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'rank'}
      },
      {'Controlname': 'Key_user', 'Controltype': 'textbox'},
      {'Controlname': 'Work_card', 'Controltype': 'textbox'},
      {'Controlname': 'Guard_card', 'Controltype': 'textbox'},
      {'Controlname': 'Computer', 'Controltype': 'textbox'},
      {'Controlname': 'Ext', 'Controltype': 'textbox'},
      {'Controlname': 'Computer', 'Controltype': 'textbox'},
      {
        'Controlname': 'Computer_level',
        'Controltype': 'radiogroup',
        'radiogroup': [],
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'computerlevel'}
      },
      {'Controlname': 'Computer_cert', 'Controltype': 'textbox'},
      {
        'Controlname': 'English_level',
        'Controltype': 'radiogroup',
        'radiogroup': [],
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'englishlevel'}
      },
      {'Controlname': 'English_cert', 'Controltype': 'textbox'},
      {
        'Controlname': 'Japanese_level',
        'Controltype': 'radiogroup',
        'radiogroup': [],
        'datasource': this.ls.api_url + '/enum/getenumitemoptions',
        'parameter': {'Enumcode': 'japaneselevel'}
      },
      {'Controlname': 'Japanese_cert', 'Controltype': 'textbox'},
      {'Controlname': 'Speciality', 'Controltype': 'textbox'},
      {'Controlname': 'Speciality_cert', 'Controltype': 'textbox'}
    ];

    this.ms.getalluser().subscribe(data => {
      let conditionoptions: any[] = [];
      // conditionoptions.push({"label":"root","value":"root"});
      for (let condition of data) {
        conditionoptions.push(condition.Userid);
      }
      console.log(conditionoptions);
      for (let colname of this.formcolnames) {
        if (colname.Controltype == 'atcomplete' && colname.Controlname == 'Userid') {
          colname.datasource = conditionoptions;
          break;
        }
      }
    });
  }

  dosubmit(event) {
    // console.log(event);
    console.log(this.formdata);
    if (event == 'query') {
      this.ms.getuser({'Userid': this.formdata.Userid}).subscribe(response => {
        // console.log(response);

        this.formdata = response[0];
      });
    } else {
      this.ms.updateuserinfo(this.formdata).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }

}
