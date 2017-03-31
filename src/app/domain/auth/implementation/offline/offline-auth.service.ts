import { Injectable } from '@angular/core';

import { AuthService } from '../../contract';
import { UserSession } from './user-session';


@Injectable()
export class OfflineAuthService implements AuthService {
    private userSession: UserSession;

    public constructor(userSession: UserSession) {
        this.userSession = userSession;
    }

    public login(userName: string, password: string): Promise<boolean> {
        // the only user is admin/password
        const loginIsSuccessful = userName === 'admin' && password === 'password';
        if (loginIsSuccessful) {
            this.userSession.beginSession(userName);
        }

        return Promise.resolve(loginIsSuccessful);
    }

    public logout(): Promise<void> {
        this.userSession.endSession();
        return Promise.resolve();
    }

    public IsAuthenticated(): boolean {
        return this.userSession.hasSession();
    }

    public GetUserInfo(): string {
        return this.userSession.getUserName();
    }
}
