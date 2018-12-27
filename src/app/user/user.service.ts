import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import {Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent} from 'rxjs';
import {map, filter, scan, retry} from 'rxjs/operators';
import {LoginService} from '../login/login.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class UserService {

  constructor(private ls: LoginService, private http: HttpClient) {
  }

  savegroups(group): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/savegroup', group, httpOptions).pipe();
  }

  getgroups(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getallgroup', httpOptions).pipe();
  }

  getgroupsjson(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getgrouptreejson', httpOptions).pipe();
  }

  getgroupbyid(groupid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getgroup', {'Groupid': groupid}, httpOptions).pipe();
  }

  deletegroupbyid(groupid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/deletegroup', {'Groupid': groupid}, httpOptions).pipe();
  }

  savegrouppriviledge(grouppriviledge): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/savegroupprivileges', grouppriviledge, httpOptions).pipe();
  }

  getgrouppriviledge(groupid): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/getgrouproletreejson', {'Groupid': groupid}, httpOptions).pipe();
  }

  deletegrouppriviledge(groupid): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/deletegroupprivilege', {'Groupid': groupid}, httpOptions).pipe();
  }

  saveusergroup(usergroup): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/saveusergroup', usergroup, httpOptions).pipe();
  }

  getusergroup(group): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/getusergroup', group, httpOptions).pipe();
  }

  deleteuserpriviledge(userid): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/deleteuserprivilege', {'Userid': userid}, httpOptions).pipe();
  }

  saveuserpriviledge(userpriviledge): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/saveuserprivileges', userpriviledge, httpOptions).pipe();
  }

  getuserrolesjson(user): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/getuserroletreejson', user, httpOptions).pipe();
  }

  getusermodualtreejson(user): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/getusermodualtreejson', user, httpOptions).pipe(retry(3));
  }

}
