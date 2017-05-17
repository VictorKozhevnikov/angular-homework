import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { authServiceToken } from '../../contract';

import { HttpAuthService } from './http-auth.service';
import { PrincipalsService } from './principals.service';
import { UserSession } from './user-session';

@NgModule({
    declarations: [],
    imports: [HttpModule],
    exports: [],
    providers: [
        { provide: authServiceToken, useClass: HttpAuthService },
        PrincipalsService,
        UserSession]
})
export class HttpAuthModule {
    constructor() { }
}
