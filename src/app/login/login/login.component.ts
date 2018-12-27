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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private message: NzMessageService) {
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }

  _submitForm() {

    this.loginService.loginCheck(this.validateForm.controls.userName.value, this.validateForm.controls.password.value)
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
          this.router.navigate(['/todo'], navigationExtras);
          // }
        } else {
          this.message.info('username or password is not right.please input again.');
        }

      });


    console.log(this.loginService.isOk);

  }

}
