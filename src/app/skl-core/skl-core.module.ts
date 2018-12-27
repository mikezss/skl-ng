import {SklCommonModule} from '../common/common.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {Routes} from '@angular/router';
import {BaseComponentComponent} from './base-component/base-component.component';
import {LoginService} from '../login/login.service';
import {DynamicFormComponent} from './dynamic-form.component';
import {DynamicFormItemComponent} from './dynamic-form-item.component';
import {SklFormComponent} from './skl-form/skl-form.component';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SklNavigatorComponent } from './skl-navigator/skl-navigator.component';
import { SklSidermenuComponent } from './skl-sidermenu/skl-sidermenu.component';
import { SklBreadcrumbComponent } from './skl-breadcrumb/skl-breadcrumb.component';
import { SklListComponent } from './skl-list/skl-list.component';

export function createTranslateHttpLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  imports: [
    SklCommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateHttpLoader),
        deps: [HttpClient]
      }
    })

  ],
  exports: [BaseComponentComponent, DynamicFormComponent, DynamicFormItemComponent, SklFormComponent, SklNavigatorComponent, SklSidermenuComponent, SklBreadcrumbComponent, SklListComponent],
  declarations: [BaseComponentComponent, DynamicFormComponent, DynamicFormItemComponent, SklFormComponent, SklNavigatorComponent, SklSidermenuComponent, SklBreadcrumbComponent, SklListComponent],
  providers: [LoginService, TranslateService]
})
export class SklCoreModule {
}
