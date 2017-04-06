import { Injectable } from '@angular/core';

@Injectable()
export class UserSession {
    private static readonly userNameKey: string = 'userName';

    public beginSession(userName: string): void {
        localStorage.setItem(UserSession.userNameKey , userName);
    }

    public endSession(): void {
        localStorage.setItem(UserSession.userNameKey, null);
    }

    public getUserName(): string {
        return localStorage.getItem(UserSession.userNameKey);
    }

    public hasSession(): boolean {
        const userName: string = localStorage.getItem(UserSession.userNameKey);
        return userName !== null;
    }

}
