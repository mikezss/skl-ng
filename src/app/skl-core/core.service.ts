import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
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

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private ls: LoginService, private http: HttpClient) {
  }

  getoptions(url: string, parameter: any): Observable<any> {
    // console.log(url);
    if (url.indexOf('http', 0) != -1) {
      if (parameter != '' && parameter != null && parameter != 'undefined' && parameter != NaN) {
        return this.http.post(url, parameter, httpOptions).pipe();
      } else {
        return this.http.post(url, httpOptions).pipe();
      }
    } else {
      return this.http.get(url).pipe();
    }


  }
}
