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
export class OrgService {

  constructor(private ls: LoginService, private http: HttpClient) {
  }

  saveorgs(org, orgleader): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/saveorg', {'org': org, 'orgleader': orgleader}, httpOptions).pipe();
  }

  getorgs(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getallorg', httpOptions).pipe(retry(3));
  }

  getorgsjson(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getorgtreejson', httpOptions).pipe();
  }

  getorgbyid(orgid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getorg', {'Orgid': orgid}, httpOptions).pipe();
  }

  deleteorgbyid(orgid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/deleteorg', {'Orgid': orgid}, httpOptions).pipe();
  }

  getleaders(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getleaders', httpOptions).pipe();
  }

  saveorgpriviledge(orgpriviledge): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/saveorgprivileges', orgpriviledge, httpOptions).pipe();
  }

  getorgpriviledge(orgid): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/getorgroletreejson', {'Orgid': orgid}, httpOptions).pipe();
  }

  deleteorgpriviledge(orgid): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/deleteorgprivilege', {'Orgid': orgid}, httpOptions).pipe();
  }

  getusersbyorgid(orgid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getusersbyorgid', {'Orgid': orgid}, httpOptions).pipe();
  }
}
