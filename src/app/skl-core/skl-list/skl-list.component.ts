import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
//import { HttpRequest, HttpClient, HttpResponse } from '@angular/common/http';
import {UploadFile} from 'ng-zorro-antd';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from '../../login/login.service';
import {CoreService} from '../core.service';
import {en_US, ja_JP, zh_CN, zh_TW, NzI18nService} from 'ng-zorro-antd';
@Component({
  selector: 'app-skl-list',
  templateUrl: './skl-list.component.html',
  styleUrls: ['./skl-list.component.css']
})
export class SklListComponent implements OnInit {
  @Input() mode = 'a';
  @Input() listtype = 'sgltbl';
  pushstr = '';
  _allChecked = false;
  _indeterminate = false;
  @Input() listtitle: string;
  @Input() listdata: any[] = [];
  @Input() listcolnames: any[] = [];
  @Output() linkAction: EventEmitter<any>;
  @Input() fileList: UploadFile[] = [];
  @Output() inputfilter: EventEmitter<any>;
  @Input() pageIndex: number;
  @Input() pageSize: number;
  @Input() total: number;
  @Input() loading = false;
  @Input() zScroll: any = {x: '300px'};
  @Output() listdatachange: EventEmitter<any>;
  @Input() buttons: any[] = [];
  @Output() action: EventEmitter<any>;
  @Output() refreshtable: EventEmitter<any>;
  @Input() tablesize = 'small';



  constructor(private ls: LoginService, private cs: CoreService, public translate: TranslateService, private nzI18nService: NzI18nService) {
    this.linkAction = new EventEmitter();
    this.inputfilter = new EventEmitter();
    this.refreshtable = new EventEmitter();
    this.listdatachange = new EventEmitter();
    this.action = new EventEmitter();
  }

  ngOnInit() {
    console.log(this.ls.lang);
    this.translate.use(this.ls.lang);
    switch (this.ls.lang) {
      case 'Chinese':
        this.nzI18nService.setLocale(zh_CN);
        break;
      case 'English':
        this.nzI18nService.setLocale(en_US);
        break;
      case 'Tchinese':
        this.nzI18nService.setLocale(zh_TW);
        break;
      case 'Japanese':
        this.nzI18nService.setLocale(ja_JP);
        break;
      default:
        this.nzI18nService.setLocale(zh_CN);
    }

    for (let i = 0; i < this.listcolnames.length; i++) {
      var controltype = this.listcolnames[i].Controltype;
      var datasource = this.listcolnames[i].datasource;
      var parameter = this.listcolnames[i].parameter;
      console.log(controltype);
      console.log(datasource);
      if (controltype === 'select' || controltype === 'checkboxgroup' || controltype === 'radiogroup') {
        if (datasource != null && datasource != '' && datasource != 'undefined') {
          this.cs.getoptions(datasource, parameter).subscribe(data => {
            switch (this.listcolnames[i].Controltype) {
              case 'select':
                this.listcolnames[i].options = data;
                break;
              case 'checkboxgroup':
                this.listcolnames[i].checkboxgroup = data;
                break;
              case 'radiogroup':
                this.listcolnames[i].radiogroup = data;
                break;
            }
          });
        }
      }
    }
  }

  append() {
    this.pushstr = `{"nno":"1"`;
    for (let i = 0; i < this.listcolnames.length; i++) {
      this.pushstr = this.pushstr + `,"` + this.listcolnames[i].Controlname + `":""`;
    }
    this.pushstr = this.pushstr + `}`;
    console.log(JSON.parse(this.pushstr));
    this.listdata.push(JSON.parse(this.pushstr));

    this._refreshStatus();
  }
  move() {
    for (let i = 0; i < this.listdata.length; i++) {
      if (this.listdata[i].checked) {
        this.listdata.splice(i, 1);
        i--;
      }
    }
    this._refreshStatus();
  }

  _refreshStatus() {
    const allChecked = this.listdata.every(value => value.checked === true);
    const allUnChecked = this.listdata.every(value => !value.checked);
    this._allChecked = allChecked;
    this._indeterminate = (!allChecked) && (!allUnChecked);
  }

  _checkAll(value) {
    if (value) {
      this.listdata.forEach(data => {
        data.checked = true;
      });
    } else {
      this.listdata.forEach(data => {
        data.checked = false;
      });
    }
    this._refreshStatus();
  }

  doLink(data, value) {
    this.linkAction.emit({'data': data, 'colname': value});
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.push(file);
    return false;
  }

  onInput(data, value) {
    this.inputfilter.emit({'data': data, 'colname': value});
  }

  listdataonchange(data, value) {
    this.listdatachange.emit({'data': data, 'colname': value});
  }

  refreshdata() {
    this.refreshtable.emit({'Pageindex': this.pageIndex, 'Pagesize': this.pageSize});
  }

  outputdefault(inputvalue, defaultvalue) {
    if (inputvalue == 'undefined') {
      return defaultvalue;
    } else {
      return inputvalue;
    }
  }

  doAction(actionname) {
    this.action.emit(actionname);
  }

}
