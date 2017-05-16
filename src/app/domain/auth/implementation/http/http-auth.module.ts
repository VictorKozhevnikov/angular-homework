import { NgModule } from '@angular/core';
import { authServiceToken } from '../../contract';
import { HttpAuthService } from './http-auth.service';

@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        { provide: authServiceToken, useClass: HttpAuthService }]
})
export class HttpAuthModule {
    constructor() { }
}
