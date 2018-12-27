import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginService} from '../../login/login.service';
import {TranslateService} from '@ngx-translate/core';
import {en_US, ja_JP, NzI18nService, zh_CN, zh_TW} from 'ng-zorro-antd';

@Component({
  selector: 'app-skl-sidermenu',
  templateUrl: './skl-sidermenu.component.html',
  styleUrls: ['./skl-sidermenu.component.css']
})
export class SklSidermenuComponent implements OnInit {
  @Input() mode = 'a';
  @Input() selectednavigator = '';
  @Input() menumoduals: any[] = [];
  @Input() isCollapsed = false;
  @Output() onclickmenu: EventEmitter<any>;
  @Output() onclickdropdown: EventEmitter<any>;
  constructor(private ls: LoginService, public translate: TranslateService, private nzI18nService: NzI18nService) {
    this.onclickmenu = new EventEmitter();
    this.onclickdropdown = new EventEmitter();
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

  clickmenu(url) {
    this.onclickmenu.emit(url);
  }
  clickdropdown(menuitem) {
    this.onclickdropdown.emit(menuitem);
  }

}
