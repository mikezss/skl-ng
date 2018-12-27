import { SklCoreModule } from '../skl-core/skl-core.module';
import { SklCommonModule } from '../common/common.module';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';


@NgModule({
  imports: [
    SklCoreModule, SklCommonModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule { }
