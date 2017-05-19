import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { HttpPrincipal } from './http-principal';

@Injectable()
export class UserSession {
    public currentPrincipal: Observable<HttpPrincipal>;

    private currentPrincipalSubject: BehaviorSubject<HttpPrincipal>
    = new BehaviorSubject<HttpPrincipal>(null);

    public constructor() {
        this.currentPrincipal = this.currentPrincipalSubject.asObservable();
        this.currentPrincipalSubject.next(this.getPrincipal());
    }

    public beginSession(principal: HttpPrincipal): void {
        localStorage.setItem('principal_id', principal.id.toString());
        localStorage.setItem('principal_userId', principal.userId.toString());
        localStorage.setItem('principal_login', principal.login);
        localStorage.setItem('principal_token', principal.token);
        this.currentPrincipalSubject.next(principal);
    }

    public endSession(): void {
        localStorage.removeItem('principal_id');
        localStorage.removeItem('principal_userId');
        localStorage.removeItem('principal_login');
        localStorage.removeItem('principal_token');
        this.currentPrincipalSubject.next(null);
    }

    public getPrincipal(): HttpPrincipal {
        const idString = localStorage.getItem('principal_id');
        if (idString === null) {
            return null;
        }
        const userIdString = localStorage.getItem('principal_userId');
        const login = localStorage.getItem('principal_login');
        const token = localStorage.getItem('principal_token');

        return {
            id: parseInt(idString),
            userId: parseInt(userIdString),
            login,
            token
        };
    }

    public hasSession(): boolean {
        return this.currentPrincipalSubject.getValue() !== null;
    }
}
