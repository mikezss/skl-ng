import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from '../../login/login.service';
import {CoreService} from '../core.service';
import {en_US, ja_JP, NzI18nService, zh_CN, zh_TW} from 'ng-zorro-antd';
@Component({
  selector: 'app-skl-navigator',
  templateUrl: './skl-navigator.component.html',
  styleUrls: ['./skl-navigator.component.css']
})
export class SklNavigatorComponent implements OnInit {
  @Input() mode = 'a';
  @Input() navigatormoduals: any[] = [];
  @Output() onclicknavigator: EventEmitter<any>;

  constructor(private ls: LoginService, public translate: TranslateService, private nzI18nService: NzI18nService) {
    this.onclicknavigator = new EventEmitter();
  }

  ngOnInit() {
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
  }
  clicknavigator(modualid) {
    this.onclicknavigator.emit(modualid);
  }


}
