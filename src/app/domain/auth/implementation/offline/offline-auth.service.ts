import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../../contract';
import { UserSession } from './user-session';
import { LoadingBlockService } from '../../../../components';

@Injectable()
export class OfflineAuthService implements AuthService {
    public userInfo: Observable<string>;

    private userInfoObserver: any;

    public constructor(
        private readonly userSession: UserSession,
        private readonly loadingBlockService: LoadingBlockService
    ) {

        this.userInfo = new Observable<string>(observer => {
            this.userInfoObserver = observer;
        });

    }

    public login(userName: string, password: string): Promise<boolean> {
        // the only user is admin/password
        const loginIsSuccessful = userName === 'admin' && password === 'password';
        if (loginIsSuccessful) {
            this.userSession.beginSession(userName);
            this.userInfoObserver.next(userName);
        }

        return this.loadingBlockService
            .block(500)
            .then(() => loginIsSuccessful);
    }

    public logout(): Promise<void> {
        this.userSession.endSession();
        this.userInfoObserver.next(null);
        return this.loadingBlockService.block(500);
    }

    public IsAuthenticated(): boolean {
        return this.userSession.hasSession();
    }

    public GetUserInfo(): string {
        return this.userSession.getUserName();
    }
}
