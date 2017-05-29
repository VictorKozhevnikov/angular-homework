import { NgModule } from '@angular/core';
import { XHRBackend, RequestOptions } from '@angular/http';

import { UserSession } from '../auth/implementation/http';

import { AuthorizedHttp } from './authorized-http';

@NgModule({
    providers: [
        {
            provide: AuthorizedHttp,
            useFactory: (
                backend: XHRBackend,
                options: RequestOptions) => {
                return new AuthorizedHttp(backend, options);
            },
            deps: [XHRBackend, RequestOptions]
        }
    ],
})
export class AuthorizedHttpModule {
    constructor() {
    }
}
