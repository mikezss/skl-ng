import {SklCoreModule} from '../skl-core/skl-core.module';
import {SklCommonModule} from '../common/common.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {MasterService} from './master.service';
import {NzMessageService} from 'ng-zorro-antd';
import {NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';
import {OrgtypeComponent} from './orgtype/orgtype.component';
import {ModualComponent} from './modual/modual.component';
import {OrgvaryComponent} from './orgvary/orgvary.component';
import {TranslateService} from '@ngx-translate/core';
import {TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LangComponent} from './lang/lang.component';
import {EnumComponent} from './enum/enum.component';
import {CompanyComponent} from './company/company.component';
import { EnumsearchComponent } from './enumsearch/enumsearch.component';
export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  imports: [
    SklCoreModule,
    SklCommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateHttpLoader),
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [OrgtypeComponent, ModualComponent, OrgvaryComponent, LangComponent, EnumComponent, CompanyComponent, EnumsearchComponent],
  providers: [
    MasterService,
    NzMessageService,
    {provide: NZ_MESSAGE_CONFIG, useValue: {nzDuration: 3000, nzMaxStack: 7, nzPauseOnHover: true, nzAnimate: true}},
    TranslateService
  ]
})
export class MasterModule {
}
