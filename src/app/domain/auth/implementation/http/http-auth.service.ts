import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { DummyWorkService } from '../../../../core';

import { AuthService, Principal } from '../../contract';

import { HttpPrincipal } from './http-principal';
import { PrincipalsService } from './principals.service';
import { UserSession } from './user-session';

@Injectable()
export class HttpAuthService implements AuthService {
    public userInfo: Observable<string>;
    public currentPrincipal: Observable<Principal>;

    private readonly loginAttempt = new Subject<HttpPrincipal>();

    public constructor(
        private readonly principalsService: PrincipalsService,
        private readonly userSession: UserSession,
        private readonly dummyWorkService: DummyWorkService
    ) {
        this.userInfo = this.userSession.currentPrincipal
            .map(principal => principal ? principal.login : null);

        this.currentPrincipal = this.userSession.currentPrincipal
            .map(httpPrincipal => {
                return httpPrincipal
                    ? {
                        login: httpPrincipal.login,
                        userId: httpPrincipal.userId
                    }
                    : null;
            });

        this.loginAttempt
            .filter(principal => principal != null)
            .subscribe(principal => this.userSession.beginSession(principal));

    }

    public login(userName: string, password: string): Observable<boolean> {

        const result: Observable<boolean> = this.principalsService
            .getPrincipal({
                login: userName,
                password
            })
            .do(principal => this.loginAttempt.next(principal))
            .map(principal => principal != null);

        return this.dummyWorkService.workOn(result);
    }

    public logout(): Observable<void> {
        const result: Observable<void> = Observable
            .of(null)
            .do(() => this.userSession.endSession());

        return this.dummyWorkService.workOn(result);
    }

    public IsAuthenticated(): boolean {
        return this.userSession.hasSession();
    }

    public GetUserInfo(): string {
        return this.userSession.hasSession()
            ? this.userSession.getPrincipal().login
            : null;
    }
}
