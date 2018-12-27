import {SklCoreModule} from './skl-core/skl-core.module';
import {SklCommonModule} from './common/common.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UserModule} from './user/user.module';
import {OrgModule} from './org/org.module';
import {RoleModule} from './role/role.module';
import {MasterModule} from './master/master.module';
import {LoginModule} from './login/login.module';
import {HomeModule} from './home/home.module';
import {FlowModule} from './flow/flow.module';
import {UserService} from './user/user.service';
import {LoginService} from './login/login.service';
import {registerLocaleData} from '@angular/common';
import {AppComponent} from './app.component';
import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {TranslateService} from '@ngx-translate/core';
import {TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {IconDefinition} from '@ant-design/icons-angular';
import {AccountBookFill, AlertFill, AlertOutline} from '@ant-design/icons-angular/icons';
import {NgZorroAntdModule, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS} from 'ng-zorro-antd';
import * as AllIcons from '@ant-design/icons-angular/icons';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);
// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
// const icons: IconDefinition[] = [ AccountBookFill, AlertOutline, AlertFill ];
// 全量引入，不推荐 ❌
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SklCoreModule, SklCommonModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateHttpLoader),
        deps: [HttpClient]
      }
    }),
    UserModule,
    OrgModule,
    RoleModule,
    MasterModule,
    LoginModule,
    HomeModule,
    FlowModule
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}, UserService, LoginService, TranslateService,
    {provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00'}, // 不提供的话，即为 Ant Design 的主题蓝色
    {provide: NZ_ICONS, useValue: icons}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
