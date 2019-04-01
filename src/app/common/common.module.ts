import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';

import {RouterModule} from '@angular/router';

import {NgModule} from '@angular/core';
import { EssenceNg2PrintModule } from 'essence-ng2-print';
import { CKEditorModule } from 'ng2-ckeditor';
import {PortalModule} from '@angular/cdk/portal';
import {MatGridListModule} from '@angular/material/grid-list';
import { LocalStorageService} from 'ngx-store';
@NgModule({
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, CommonModule,
    RouterModule, NgZorroAntdModule, HttpModule, HttpClientModule, TranslateModule, EssenceNg2PrintModule, CKEditorModule, PortalModule,
    MatGridListModule
  ],
  declarations: [],
  exports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, CommonModule,
    RouterModule, NgZorroAntdModule, HttpModule, HttpClientModule, TranslateModule, EssenceNg2PrintModule, CKEditorModule, PortalModule,
    MatGridListModule
  ],
  providers: [LocalStorageService]
})
export class SklCommonModule {
}
