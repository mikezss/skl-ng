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
export class HomeService {

  constructor(private ls: LoginService, private http: HttpClient) {
  }

  getnavigatormodualbyuser(userid): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/getnavigatormodualbyuser', {'Userid': userid}, httpOptions).pipe();
  }

  getmenumodualbyparent(userid, modualid): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/getmenumodualbyparent', {'Userid': userid, 'Modualid': modualid}, httpOptions).pipe();
  }

}
