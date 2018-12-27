import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MasterService} from '../../master/master.service';
import {LoginService} from '../../login/login.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';


@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {

  userid = '';
  formcolnames: any[] = [];
  formdata: any = {};

  constructor(private ls: LoginService, private ms: MasterService, private message: NzMessageService, private router: Router) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Password', 'Controltype': 'textbox'}
    ];


  }

  dosubmit(event) {

    if (event == 'Save') {
      this.ms.passwordchange({'Userid': this.ls.userid, 'Password': this.formdata.Password}).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }

}
