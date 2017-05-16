import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';

import { AuthService } from '../../contract';
import { UserSession } from './user-session';
import { DummyWorkService } from '../../../../core';

@Injectable()
export class HttpAuthService implements AuthService {
    public userInfo: Observable<string>;

    private userInfoSubject: ReplaySubject<string> = new ReplaySubject<string>(1);

    public constructor(
        private readonly userSession: UserSession,
        private readonly dummyWorkService: DummyWorkService
    ) {
        this.userInfo = this.userInfoSubject.asObservable();
    }

    public login(userName: string, password: string): Observable<boolean> {
        // the only user is admin/password
        const loginIsSuccessful = userName === 'admin' && password === 'password';
        if (loginIsSuccessful) {
            this.userSession.beginSession(userName);
            this.userInfoSubject.next(userName);
        }

        const result = Observable.of(loginIsSuccessful);

        return this.dummyWorkService.workOn(result);
    }

    public logout(): Observable<void> {
        this.userSession.endSession();
        this.userInfoSubject.next(null);

        const result = Observable.of(null);

        return this.dummyWorkService.workOn(result);
    }

    public IsAuthenticated(): boolean {
        return this.userSession.hasSession();
    }

    public GetUserInfo(): string {
        return this.userSession.getUserName();
    }
}
