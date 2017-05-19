import { Injectable } from '@angular/core';
import { RequestMethod, Request, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { AuthorizedHttp } from '../../../http';

import { Credentials } from './credentials';
import { HttpPrincipal } from './http-principal';

@Injectable()
export class PrincipalsService {
    // private static readonly baseUrl: string = 'http://localhost:3000';

    public constructor(
        private readonly http: AuthorizedHttp,
    ) {
    }

    public getPrincipal(credentials: Credentials): Observable<HttpPrincipal> {

        const params: URLSearchParams = new URLSearchParams();
        params.set('login', credentials.login);
        params.set('password', credentials.password);

        const request: Request = new Request({
            method: RequestMethod.Get,
            url: '/principals',
            params
        });

        const result: Observable<HttpPrincipal> = this.http
            .request(request)
            .map(response => response.json())
            .map(principals =>
                principals.length === 1
                    ? principals[0]
                    : null
            );

        return result;
    }

}
