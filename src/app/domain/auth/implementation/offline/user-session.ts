import { Injectable } from '@angular/core';

@Injectable()
export class UserSession {
    private userName: string;

    public beginSession(userName: string): void {
        this.userName = userName;
    }

    public endSession(): void {
        this.userName = null;
    }

    public getUserName(): string {
        return this.userName;
    }

    public hasSession(): boolean {
        return this.userName !== null;
    }

}
