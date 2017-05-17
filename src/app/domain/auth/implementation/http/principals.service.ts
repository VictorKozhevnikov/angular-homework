import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { Credentials } from './credentials';
import { Principal } from './principal';

@Injectable()
export class PrincipalsService {
    private static readonly baseUrl: string = 'http://localhost:3000';

    public constructor(
        private readonly http: Http,
    ) {
    }

    public getPrincipal(credentials: Credentials): Observable<Principal> {

        const params: URLSearchParams = new URLSearchParams();
        params.set('login', credentials.login);
        params.set('password', credentials.password);

        const request: Request = new Request({
            method: RequestMethod.Get,
            url: PrincipalsService.baseUrl + '/principals',
            params
        });

        const result: Observable<Principal> = this.http
            .request(request)
            .map(response => response.json());

        return result;
    }

}
