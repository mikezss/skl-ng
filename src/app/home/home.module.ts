import {SklCoreModule} from '../skl-core/skl-core.module';
import {SklCommonModule} from '../common/common.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {HttpClient, HttpParams} from '@angular/common/http';
import {AppRoutingModule} from '../app-routing.module';

import {NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {TranslateService} from '@ngx-translate/core';
import {TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HomeService} from './home.service';
import {HomeComponent} from './home/home.component';
import {HomeRoutingModule} from '../home-routing.module';

export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    SklCoreModule,
    SklCommonModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateHttpLoader),
        deps: [HttpClient]
      }
    }),
    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
  providers: [HomeService],
  exports: [HomeComponent]
})
export class HomeModule {
}
