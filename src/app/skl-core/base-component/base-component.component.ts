import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../login/login.service';
import {of} from 'rxjs/observable/of';
import {Observable} from 'rxjs/Observable';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route
} from '@angular/router';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.css']
})
export class BaseComponentComponent implements OnInit {
  istrue = false;
  fromurl: string;

  constructor(private loginService: LoginService, private router: Router) {
    // console.log("BaseComponentComponent constructor==>start");
    // this.islogout();

  }

  islogout() {
    of(this.loginService.isOk).subscribe(value => this.istrue = value);
    if (!this.istrue) {
      console.log(this.istrue);
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
  }

}
