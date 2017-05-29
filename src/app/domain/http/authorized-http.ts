import { Injectable } from '@angular/core';

import {
    Http,
    XHRBackend,
    RequestOptions,
    Request,
    RequestOptionsArgs,
    Response,
    Headers
} from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { UserSession, HttpPrincipal } from '../auth/implementation/http';

@Injectable()
export class AuthorizedHttp extends Http {

    constructor(
        backend: XHRBackend,
        options: RequestOptions) {
        super(backend, options);
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        const token: string = localStorage.getItem('principal_token');

        // meaning we have to add the token to the options, not in url
        if (typeof url === 'string') {
            if (!options) {
                // let's make option object
                options = { headers: new Headers() };
            }
            options.headers.set('Authorization', token);
        } else {
            // we have to add the token to the url object
            url.headers.set('Authorization', token);
        }
        return super.request(url, options).catch((res: Response) => {
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                console.log('---- not authenticated');
            }
            return Observable.throw(res);
        });
    }
}
