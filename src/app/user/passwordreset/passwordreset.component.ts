import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {MasterService} from '../../master/master.service';
import {UserService} from '../user.service';
import {
  NavigationExtras,
  Route,
  Router,
  ParamMap,
  ActivatedRoute
} from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {
  userid = '';
  formcolnames: any[] = [];
  formdata: any = {};

  constructor(private us: UserService, private ms: MasterService, private message: NzMessageService, private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.formcolnames = [
      {'Controlname': 'Password', 'Controltype': 'textbox'},
      {'Controlname': 'Confirmpassword', 'Controltype': 'textbox'}
    ];
    this.router.queryParams.subscribe(params => {
      this.userid = params.Userid;
    });
  }

  dosubmit(event) {

    if (event == 'save') {
      if (this.formdata.Password != this.formdata.Confirmpassword) {
        this.message.info('Two inputted password inconsistencies!');
        return;
      }
      this.ms.passwordreset({'Userid': this.userid, 'Password': this.formdata.Password}).subscribe(data => {
        console.log(data);
        this.message.info('submit==>' + data.status);
      });
    }
  }

}
