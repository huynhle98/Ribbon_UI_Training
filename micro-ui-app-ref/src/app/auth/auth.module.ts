import {NgModule} from '@angular/core';

import { RbnCommonLibModule } from 'rbn-common-lib';
import { LoginService } from '../services/login.service';
import { GetInformationService } from '../services/get-information.service';
import { mockBackendProvider } from '../mock-backend';
import { LeftnavService } from '../services/leftnav.service';

@NgModule({
  imports: [
    RbnCommonLibModule
  ],
  declarations: [
  ],
  providers: [
    LoginService, GetInformationService, mockBackendProvider,
    { provide: 'LoginInterfaceService', useClass: LoginService },
    { provide: 'GetInfoInterfaceService', useClass: GetInformationService },
    { provide: 'LeftnavInterfaceService', useClass: LeftnavService }
  ],
})
export class AuthModule {}
