import { Injectable } from '@angular/core';
import { Http, RequestMethod, Request, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { User, UsersService } from '../../contract';

@Injectable()
export class UsersHttpService implements UsersService {
    public constructor(
        private readonly http: Http,
    ) {
    }

    public getUser(id: number): Observable<User> {
        const params: URLSearchParams = new URLSearchParams();
        params.set('id', id.toString());

        const request: Request = new Request({
            method: RequestMethod.Get,
            url: '/users',
            params
        });

        const result: Observable<User> = this.http
            .request(request)
            .map(response => response.json())
            .map(users =>
                users.length === 1
                    ? users[0]
                    : null
            );

        return result;
    }
}
