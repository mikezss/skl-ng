import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {TranslateService} from '@ngx-translate/core';

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

  constructor(public translate: TranslateService, private http: HttpClient) {
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

  checkrequired(formcolnames: any[], formdata: {}, message: NzMessageService) {
    var isok = true;
    for (let colname of formcolnames) {
      if (colname.required != 'undefined' && colname.required == true) {
        if (colname.Controltype == 'upload') {
          if (colname.fileList.length < 1) {
            this.translate.get(colname.Controlname).subscribe(value => {
              message.error('请选择'+ value + '文件！');
            });
            isok = false;
            return isok;
          }
        } else {
          if (formdata[colname.Controlname] == null || formdata[colname.Controlname] == 'undefined' || formdata[colname.Controlname] == '' || formdata[colname.Controlname] == 'NaN') {

            this.translate.get(colname.Controlname).subscribe(value => {
              message.error(value + ' ,必须输入！');
            });

            message.warning('标识为红色星号的项目必须输入！');
            isok = false;
            return isok;
          }
        }
      }
    }
    return isok;
  }


}
