import {Component, NgModule, OnInit, OnChanges} from '@angular/core';
import {LoginService} from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  isfirst = true;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.isfirst = this.loginService.isOk;
  }

  ngOnChanges() {
    console.log('app.ngOnChanges()==>');
  }
}
