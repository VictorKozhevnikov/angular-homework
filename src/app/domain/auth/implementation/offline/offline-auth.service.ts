import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../../contract';
import { UserSession } from './user-session';
import { DummyWorkService } from '../../../../core';

@Injectable()
export class OfflineAuthService implements AuthService {
    public userInfo: Observable<string>;

    private userInfoObserver: any;

    public constructor(
        private readonly userSession: UserSession,
        private readonly dummyWorkService: DummyWorkService
    ) {

        this.userInfo = new Observable<string>(observer => {
            this.userInfoObserver = observer;
        });

    }

    public login(userName: string, password: string): Observable<boolean> {
        // the only user is admin/password
        const loginIsSuccessful = userName === 'admin' && password === 'password';
        if (loginIsSuccessful) {
            this.userSession.beginSession(userName);
            this.userInfoObserver.next(userName);
        }

        const result = Observable.of(loginIsSuccessful);

        return this.dummyWorkService.workOn(result);
    }

    public logout(): Observable<void> {
        this.userSession.endSession();
        this.userInfoObserver.next(null);

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
