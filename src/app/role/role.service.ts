import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../login/login.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class RoleService {

  constructor(private ls: LoginService, private http: HttpClient) {
  }

  saveroles(role): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/saverole', role, httpOptions).pipe();
  }

  getroles(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getallrole', httpOptions).pipe();
  }

  getrolesjson(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getroletreejson', httpOptions).pipe();
  }

  getrolebyid(roleid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getrole', {'Roleid': roleid}, httpOptions).pipe();
  }

  deleterolebyid(roleid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/deleterole', {'Roleid': roleid}, httpOptions).pipe();
  }

  saverolepriviledge(rolepriviledge): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/saveroleprivileges', rolepriviledge, httpOptions).pipe();
  }

  getrolepriviledge(roleid): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/getroleprivilegetreejson', {'Roleid': roleid}, httpOptions).pipe();
  }

  deleterolepriviledge(roleid): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/deleteroleprivilege', {'Roleid': roleid}, httpOptions).pipe();
  }

  saveuserrole(userrole): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/saveuserrole', userrole, httpOptions).pipe();
  }

  getuserrole(userrole): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/getuserrole', userrole, httpOptions).pipe();
  }


}
