import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};


@Injectable()
export class LoginService {
  api_url = 'http://localhost:8088';
  isOk = false;
  redirectUrl = '';
  userid = '';
  lang = 'Chinese';

  constructor(private http: HttpClient) {
  }

  loginCheck(username, password, companycode): Observable<any> {
    // console.log(username);
    // console.log(password);

    return this.http.post(this.api_url + '/login/login',
      JSON.stringify({'userName': username, 'password': password, 'companycode': companycode}), httpOptions);


  }

  logout() {
    this.isOk = false;
    this.userid = '';
    this.redirectUrl = '';
  }

  deepCopy(p, c) {
    c = c || {};
    for (let i in p) {
      if (!p.hasOwnProperty(i)) {
        continue;
      }
      if (typeof p[i] === 'object') {
        c[i] = (p[i].constructor === Array) ? [] : {};
        this.deepCopy(p[i], c[i]);
      } else {
        c[i] = p[i];
      }
    }
    return c;
  }

  titlecase(content) {
    return content.substr(0, 1).toLocaleUpperCase() + content.substr(1);
  }
  checkrequired(formcolnames: any[], formdata: {}, message: NzMessageService){
    var isok = true;
    for (let colname of formcolnames){
      if (colname.required != 'undefined' && colname.required == true){
        if( formdata[colname.Controlname] == null || formdata[colname.Controlname] == 'undefined'|| formdata[colname.Controlname] =='' || formdata[colname.Controlname] =='NaN'){
          message.error(colname.Controlname + ' is required');
          message.warning('标识红色的项目必须输入！');
          isok = false;
          return isok;
        }
      }
    }
    return isok;
  }


}
