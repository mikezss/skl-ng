import {SklCoreModule} from '../skl-core/skl-core.module';
import {SklCommonModule} from '../common/common.module';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import {UserComponent} from './user/user.component';
import {UsergroupComponent} from './usergroup/usergroup.component';
import {UserinfoComponent} from './userinfo/userinfo.component';
import {MasterService} from '../master/master.service';
import {NzMessageService} from 'ng-zorro-antd';
import {NZ_MESSAGE_CONFIG} from 'ng-zorro-antd';
import {UserService} from './user.service';
import {UsermanageComponent} from './usermanage/usermanage.component';
import {PasswordchangeComponent} from './passwordchange/passwordchange.component';
import {PasswordresetComponent} from './passwordreset/passwordreset.component';

@NgModule({
  imports: [
    SklCoreModule, SklCommonModule
  ],
  declarations: [UserComponent, UsergroupComponent, UserinfoComponent, UsermanageComponent, PasswordchangeComponent, PasswordresetComponent],
  providers: [
    UserService,
    MasterService,
    NzMessageService,
    {provide: NZ_MESSAGE_CONFIG, useValue: {nzDuration: 3000, nzMaxStack: 7, nzPauseOnHover: true, nzAnimate: true}}
  ]
})
export class UserModule {
}
