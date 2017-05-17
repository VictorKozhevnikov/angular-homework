import { Injectable } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs/Rx';

import { AuthService } from '../../contract';

import { DummyWorkService } from '../../../../core';

import { PrincipalsService } from './principals.service';
import { UserSession } from './user-session';

@Injectable()
export class HttpAuthService implements AuthService {
    public userInfo: Observable<string>;

    public constructor(
        private readonly principalsService: PrincipalsService,
        private readonly userSession: UserSession,
        private readonly dummyWorkService: DummyWorkService
    ) {
        this.userInfo = this.userSession.currentPrincipal
            .map(principal => principal ? principal.login : null);
    }

    public login(userName: string, password: string): Observable<boolean> {

        const result: Observable<boolean> = this.principalsService
            .getPrincipal({
                login: userName,
                password
            })
            .do(p => this.userSession.beginSession(p))
            .map(() => true);

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
