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

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(private ls: LoginService, private http: HttpClient) {
  }

  saveflowtemplate(maindata, itemdata): Observable<any> {
    console.log('start');
    console.log(maindata);
    console.log('end');
    return this.http.post(this.ls.api_url + '/flow/saveflowtemplate', {
      'Flowtemplate': maindata,
      'Flowtemplateitem': itemdata
    }, httpOptions).pipe();
  }

  getflowtemplate(): Observable<any> {

    return this.http.get(this.ls.api_url + '/flow/getflowtemplate', httpOptions).pipe();
  }

  getflowtemplateitem(templateid): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getflowtemplateitem', {'Flowtemplateid': templateid}, httpOptions).pipe();
  }

  getflowtemplatebyid(templateid): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getflowtemplatebyid', {'Flowtemplateid': templateid}, httpOptions).pipe();
  }

  deleteflowtemplate(flowtemplateid): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/deleteflowtemplate', {'Flowtemplateid': flowtemplateid}, httpOptions).pipe();
  }

  getflowtask(templateid): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getflowtask', {'Flowtemplateid': templateid}, httpOptions).pipe();
  }

  saveflowtask(tasktype, manformdata, manactiondata, manexecuterdata, switchformdata, switchactiondata): Observable<any> {
    if (tasktype == 'man') {
      return this.http.post(this.ls.api_url + '/flow/saveflowtask', {
        'Flowtask': manformdata,
        'Flowmantaskaction': manactiondata,
        'Flowmantaskexecuter': manexecuterdata
      }, httpOptions).pipe();

    } else {
      return this.http.post(this.ls.api_url + '/flow/saveflowtask', {
        'Flowtask': switchformdata,
        'Flowswitchtaskaction': switchactiondata
      }, httpOptions).pipe();

    }
  }

  getexecuterjson(): Observable<any> {

    return this.http.get('/assets/executer.json').pipe();
  }

  deleteflowtaskid(templateid, taskid): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/deleteflowtask', {'Flowtemplateid': templateid, 'Taskid': taskid}, httpOptions).pipe();
  }

  gettaskinfo(modualid, currentfiid, currenttiid): Observable<any> {
    return this.http.post(this.ls.api_url + '/flow/gettaskinfo', {
      'Modualid': modualid,
      'Currentfiid': currentfiid,
      'Currenttiid': currenttiid
    }, httpOptions).pipe();

  }

  gettodotask(queryitems): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/gettodotask', queryitems, httpOptions).pipe();
  }

  getdonetask(queryitems): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getdonetask', queryitems, httpOptions).pipe();
  }

  getflowmonitorcount(queryitems): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getflowmonitorcount', queryitems, httpOptions).pipe();
  }

  getflowmonitorbypageindex(queryitems): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getflowmonitorbypageindex', queryitems, httpOptions).pipe();
  }

  getdonetasklist(queryitems): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getdonetasklist', queryitems, httpOptions).pipe();
  }

  gettodotasklist(queryitems): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/gettodotasklist', queryitems, httpOptions).pipe();
  }

  getmyflow(queryitems): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getmyflow', queryitems, httpOptions).pipe();
  }

  cancelflow(fiid, flowtemplateid): Observable<any> {
    return this.http.post(this.ls.api_url + '/flow/cancelflow', {'Fiid': fiid, 'Flowtemplateid': flowtemplateid}, httpOptions).pipe();
  }

  skiptask(fiid, tiid, flowtemplateid): Observable<any> {
    return this.http.post(this.ls.api_url + '/flow/skiptask', {
      'Fiid': fiid,
      'Tiid': tiid,
      'Flowtemplateid': flowtemplateid
    }, httpOptions).pipe();
  }

  getfloworgvarybypageindex(page): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getfloworgvarybypageindex', page, httpOptions).pipe();
  }

  getfloworgvary(): Observable<any> {

    return this.http.get(this.ls.api_url + '/flow/getfloworgvary', httpOptions).pipe();
  }

  getfloworgvarycount(): Observable<any> {

    return this.http.get(this.ls.api_url + '/flow/getfloworgvarycount', httpOptions).pipe();
  }

  savefloworgvary(listdata): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/savefloworgvary', listdata, httpOptions).pipe();
  }

  saveflowstatus(listdata): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/saveflowstatus', listdata, httpOptions).pipe();
  }

  getflowstatus(): Observable<any> {

    return this.http.get(this.ls.api_url + '/flow/getflowstatus', httpOptions).pipe();
  }

  saveagent(listdata): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/saveagent', listdata, httpOptions).pipe();
  }

  getagent(): Observable<any> {

    return this.http.get(this.ls.api_url + '/flow/getagent', httpOptions).pipe();
  }

  getuserforagent(querydata): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getuserforagent', querydata, httpOptions).pipe();
  }

  getflowstatusbyfiid(fiid): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/getflowstatusbyfiid', {'Fiid': fiid}, httpOptions).pipe();
  }

  copyflowtemplate(flowtemplateid, copyflowtemplateid, copyflowtemplatename): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/copyflowtemplate', {'Flowtemplateid': flowtemplateid, 'Copyflowtemplateid': copyflowtemplateid, 'Copyflowtemplatename': copyflowtemplatename}, httpOptions).pipe();
  }

  transfersign(data): Observable<any> {
    return this.http.post(this.ls.api_url + '/flow/transfersign', data, httpOptions).pipe();
  }

  transferpost(data): Observable<any> {
    return this.http.post(this.ls.api_url + '/flow/transferpost', data, httpOptions).pipe();
  }

  leave(data): Observable<any> {
    return this.http.post(this.ls.api_url + '/flow/leave', data, httpOptions).pipe();
  }

  gettodotaskfortransfer(queryitems): Observable<any> {

    return this.http.post(this.ls.api_url + '/flow/gettodotaskfortransfer', queryitems, httpOptions).pipe();
  }

}
