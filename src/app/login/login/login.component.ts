import {Component, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import {LoginService} from '../login.service';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

import { LocalStorageService} from 'ngx-store';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private lss: LocalStorageService, private loginService: LoginService, private router: Router, private message: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      companycode: [ null, [ Validators.required ] ],
      remember: [ true ]
    });


    this.validateForm.controls.userName.setValue(this.lss.get('username')) ;
    this.validateForm.controls.companycode.setValue(this.lss.get('companycode')) ;
    this.validateForm.controls.password.setValue(this.lss.get('password')) ;
  }

  _submitForm() {

    this.loginService.loginCheck(this.validateForm.controls.userName.value, this.validateForm.controls.password.value, this.validateForm.controls.companycode.value)
      .subscribe(response => {
        if (response.status === 'ok') {
          this.loginService.isOk = true;
          this.loginService.userid = this.validateForm.controls.userName.value;
          let navigationExtras: NavigationExtras = {
            queryParamsHandling: 'preserve',
            preserveFragment: true
          };
          // if(this.loginService.redirectUrl!="" && this.loginService.redirectUrl!="/login" && this.loginService.redirectUrl!="/home"){
          // this.router.navigate([this.loginService.redirectUrl], navigationExtras);
          // }else{
          if(this.validateForm.controls.remember.value === true ){
            this.lss.set('username', this.validateForm.controls.userName.value);
            this.lss.set('companycode', this.validateForm.controls.companycode.value);
            this.lss.set('password', this.validateForm.controls.password.value);
          }else{
            this.lss.remove('username');
            this.lss.remove('companycode');
            this.lss.remove('password');
          }


          this.router.navigate(['/todo'], navigationExtras);
          // }
        } else {
          this.message.info('username or password is not right.please input again.');
        }

      });


    console.log(this.loginService.isOk);

  }

}
