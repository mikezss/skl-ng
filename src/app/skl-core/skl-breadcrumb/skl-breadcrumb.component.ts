import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from '../../login/login.service';
import {en_US, ja_JP, NzI18nService, zh_CN, zh_TW} from 'ng-zorro-antd';

@Component({
  selector: 'app-skl-breadcrumb',
  templateUrl: './skl-breadcrumb.component.html',
  styleUrls: ['./skl-breadcrumb.component.css']
})
export class SklBreadcrumbComponent implements OnInit {
  @Input() mode = 'a';
  @Input() breadcrumbs: any[];

  constructor(private ls: LoginService, public translate: TranslateService, private nzI18nService: NzI18nService) {
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

}
