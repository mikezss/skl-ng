import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {UploadFile} from 'ng-zorro-antd';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from '../../login/login.service';
import {CoreService} from '../core.service';
import {en_US, ja_JP, zh_CN, zh_TW, NzI18nService} from 'ng-zorro-antd';

@Component({
  selector: 'app-skl-form',
  templateUrl: './skl-form.component.html',
  styleUrls: ['./skl-form.component.css']
})
export class SklFormComponent implements OnInit {
  @Input() mode = 'a';
  @Input() formtitle: string;
  @Input() formcolnames: any[];
  @Input() formdata: any = {};
  @Input() ngutter = 40;
  @Input() ncolcount = 1;
  @Input() tablesize = 'default';
  @Input() buttons: any[] = ['save'];
  @Input() nzformat = 'yyyy-MM-dd HH:mm:ss';
  @Input() disabledDate: any;
  @Input() disabledRangeTime: any;


  @Output() action: EventEmitter<any>;

  @Output() uploadcheck: EventEmitter<any>;
  @Output() linkAction: EventEmitter<any>;
  @Output() formdatachange: EventEmitter<any>;

  constructor(private ls: LoginService, private cs: CoreService, public translate: TranslateService, private nzI18nService: NzI18nService) {
    this.action = new EventEmitter();

    this.uploadcheck = new EventEmitter();
    this.linkAction = new EventEmitter();
    this.formdatachange = new EventEmitter();
  }

  ngOnInit() {
    // �л�����
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

    for (let i = 0; i < this.formcolnames.length; i++) {
      var controltype = this.formcolnames[i].Controltype;
      var datasource = this.formcolnames[i].datasource;
      var parameter = this.formcolnames[i].parameter;
      if (controltype === 'select' || controltype === 'checkboxgroup' || controltype === 'radiogroup') {
        if (datasource != null && datasource != '' && datasource != 'undefined') {
          this.cs.getoptions(datasource, parameter).subscribe(data => {
            switch (this.formcolnames[i].Controltype) {
              case 'select':
                this.formcolnames[i].options = data;
                break;
              case 'checkboxgroup':
                this.formcolnames[i].checkboxgroup = data;
                break;
              case 'radiogroup':
                this.formcolnames[i].radiogroup = data;
                break;
            }
          });
        }
      }
    }
  }

  doAction(actionname) {
    this.action.emit(actionname);
  }

  formdataonchange(controlname) {
    this.formdatachange.emit(controlname);
  }

  beforeUpload = (file: UploadFile, fileList: UploadFile[]): boolean => {
    // console.log(file);
    // console.log(fileList);
    this.uploadcheck.emit(file);
    return false;
  };
  beforeUploadlist = (file: UploadFile): boolean => {
    console.log(file);
    // console.log(fileList);
    // this.uploadcheck.emit(file);
    return false;
  };

  outputdefault(inputvalue, defaultvalue) {
    // console.log(inputvalue);
    // console.log(defaultvalue);

    if (inputvalue == 'undefined') {
      return defaultvalue;
    } else {
      return inputvalue;
    }

  }

  doLink(data, colname) {
    this.linkAction.emit({'data': data, 'colname': colname});
  }

}
