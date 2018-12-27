import {Component, NgModule, OnInit, OnChanges, ViewChild} from '@angular/core';

import {LoginService} from '../../login/login.service';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad, Route, ParamMap, ActivatedRoute
} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {RoleService} from '../../role/role.service';
import {MasterService} from '../../master/master.service';
import {UserService} from '../../user/user.service';
import {HomeService} from '../home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  navigatormoduals: any[] = [];
  menumoduals: any[] = [];
  selectednavigator = '';
  isCollapsed = false;
  breadcrumbs: any[] = [];
  userid = '';
  selectedkey = '';
  title = 'app';
  navigatestyle: string;

  constructor(private us: UserService, private ls: LoginService, private hs: HomeService, private router: Router) {
  }

  ngOnInit() {
    console.log('HomeComponent.ngOnInit===>');
    this.navigatestyle = '0';
    console.log(this.ls.userid);
    this.userid = this.ls.userid;
    this.hs.getnavigatormodualbyuser(this.userid).subscribe(response => {
      this.navigatormoduals = response;
    });
  }

  ngOnChanges() {
    console.log('app.ngOnChanges()==>');
  }

  logout() {
    this.ls.logout();
    console.log(this.ls.isOk);
    this.router.navigate(['/login']);


  }

  switchnv(stylen) {
    console.log(stylen);
    this.navigatestyle = stylen;
  }

  switchlang(lang) {
    console.log(lang);
    this.ls.lang = lang;
  }


  clicknavigator(menu) {
    this.breadcrumbs = [];
    this.breadcrumbs.push(menu.Modualname);
    this.selectednavigator = menu.Modualname;
    this.hs.getmenumodualbyparent(this.ls.userid, menu.Modualid).subscribe(response => {
      this.menumoduals = response;
    });
  }

  clickmenu(menu) {
    console.log(menu);
    this.breadcrumbs = [];
    this.breadcrumbs.push(this.selectednavigator);
    this.breadcrumbs.push(menu.Modualname);

    this.router.navigate([menu.Url], {queryParams: {'Mode': 'a'}});

  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }
}
