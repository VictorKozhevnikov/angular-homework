import { NgModule } from '@angular/core';
import { authServiceToken } from '../../contract';
import { OfflineAuthService } from './offline-auth.service';
import { UserSession } from './user-session';


@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        {provide: authServiceToken, useClass: OfflineAuthService },
        UserSession]
})
export class OfflineAuthModule {
    constructor() { }
}
