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

const httpuploadOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class MasterService {

  constructor(private ls: LoginService, private http: HttpClient) {
  }

  saveorgtype(orgtypedata: any): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/saveorgtype', orgtypedata, httpOptions).pipe();
  }

  getorgtype(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getorgtype', httpOptions).pipe();
  }

  getemergency(): Observable<any> {

    return this.http.get('/assets/emergency.json').pipe();
  }
  savepost(postdata: any): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/savepost', postdata, httpOptions).pipe();
  }

  getpost(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getpost', httpOptions).pipe();
  }

  savedegree(degreedata: any): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/savedegree', degreedata, httpOptions).pipe();
  }

  getdegree(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getdegree', httpOptions).pipe();
  }

  savemoduals(modual): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/savemodual', modual, httpOptions).pipe();
  }

  getmoduals(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getallmodual', httpOptions).pipe();
  }

  getmodualsjson(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getmodualtreejson', httpOptions).pipe(retry(3));
  }

  getmodualbyid(modualid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getmodual', {'Modualid': modualid}, httpOptions).pipe();
  }

  deletemodualbyid(modualid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/deletemodual', {'Modualid': modualid}, httpOptions).pipe();
  }

  getuser(user): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getuser', user, httpOptions).pipe();
  }

  getuseroptionsbyorgid(orgid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getuseroptionsbyorgid', {'Orgid': orgid}, httpOptions).pipe();
  }

  saveuser(user): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/saveuser', user, httpOptions).pipe();
  }

  deleteuserbyid(user): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/deleteuser', user, httpOptions).pipe();
  }

  getalluser(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getalluser', httpOptions).pipe();
  }

  savemodualtemplate(modualtemplate): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/savemodualtemplate', modualtemplate, httpOptions).pipe();
  }

  deletemodualtemplatebyid(modualid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/deletemodualtemplate', {'Modualid': modualid}, httpOptions).pipe();
  }

  getmodualtemplatebyid(modualid): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getmodualtemplate', {'Modualid': modualid}, httpOptions).pipe();
  }

  getorgvary(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getorgvary', httpOptions).pipe();
  }

  saveorgvary(listdata): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/saveorgvary', listdata, httpOptions).pipe();
  }

  passwordchange(userdata): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/passwordchange', userdata, httpOptions).pipe();
  }

  passwordreset(userdata): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/passwordreset', userdata, httpOptions).pipe();
  }


  updateuserinfo(user): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/updateuserinfo', user, httpOptions).pipe();
  }


  uploadusers(filepath): Observable<any> {
    return this.http.post(this.ls.api_url + '/master/uploadusers', filepath, httpOptions).pipe();
  }

  uploadfile(formdata): Observable<any> {
    return this.http.post(this.ls.api_url + '/common/uploadfile', formdata).pipe();
  }

  savelang(data: any): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/savelang', data, httpOptions).pipe();
  }

  getlang(): Observable<any> {

    return this.http.get(this.ls.api_url + '/master/getlang', httpOptions).pipe();
  }

  getlangbypageindex(querydata): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getlangbypageindex', querydata, httpOptions).pipe();
  }

  checkboxgroup2string(checkboxgroup: any []): string {
    let flowstatusarr: any[] = [];
    for (let i = 0; i < checkboxgroup.length; i++) {
      if (checkboxgroup[i].checked == true) {
        flowstatusarr.push('\'' + checkboxgroup[i].value + '\'');
      }
    }
    return flowstatusarr.join(',');
  }


  loadlangjson(data: any): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/loadlangjson', data, httpOptions).pipe();
  }

  updatelangjson(data: any): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/updatelangjson', data, httpOptions).pipe();
  }
  saveenum(formdata, listdata): Observable<any> {

    return this.http.post(this.ls.api_url + '/enum/saveenum', {
      'enum': formdata,
      'enumitem': listdata
    }, httpOptions).pipe();
  }

  getenum(queryitem): Observable<any> {
    return this.http.post(this.ls.api_url + '/enum/getenum', queryitem, httpOptions).pipe();
  }

  getenumitem(queryitem): Observable<any> {
    return this.http.post(this.ls.api_url + '/enum/getenumitem', queryitem, httpOptions).pipe();
  }

  getenumbyid(queryitem): Observable<any> {
    return this.http.post(this.ls.api_url + '/enum/getenumbyid', queryitem, httpOptions).pipe();
  }

  getenumfilesbyid(queryitem): Observable<any> {
    return this.http.post(this.ls.api_url + '/common/getfilelistbyfiid', queryitem, httpOptions).pipe();
  }
  getlangcount(queryitems): Observable<any> {

    return this.http.post(this.ls.api_url + '/master/getlangcount', queryitems, httpOptions).pipe();
  }
  savecompany(data: any): Observable<any> {

    return this.http.post(this.ls.api_url + '/company/savecompany', data, httpOptions).pipe();
  }

  getcompany(): Observable<any> {

    return this.http.get(this.ls.api_url + '/company/getcompany', httpOptions).pipe();
  }
}
