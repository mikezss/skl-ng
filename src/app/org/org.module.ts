import { SklCoreModule } from '../skl-core/skl-core.module';
import { SklCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';


import { NzMessageService } from 'ng-zorro-antd';
import { NZ_MESSAGE_CONFIG } from 'ng-zorro-antd';
import { OrgService } from './org.service';
import { OrgComponent } from './org/org.component';

@NgModule({
  imports: [
    SklCoreModule, SklCommonModule
  ],
  declarations: [OrgComponent],
  providers: [OrgService]
})
export class OrgModule { }
