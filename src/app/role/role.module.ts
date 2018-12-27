import { SklCoreModule } from '../skl-core/skl-core.module';
import { SklCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';

import { RoleService } from './role.service';
import { RoleComponent } from './role/role.component';
import { NzMessageService } from 'ng-zorro-antd';
import { NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';

@NgModule({
  imports: [
    SklCoreModule, SklCommonModule
  ],
  declarations: [RoleComponent],
  providers: [RoleService]
})
export class RoleModule { }
