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
    }

    public beginSession(principal: HttpPrincipal): void {
        this.currentPrincipalSubject.next(principal);
    }

    public endSession(): void {
        this.currentPrincipalSubject.next(null);
    }

    public getPrincipal(): HttpPrincipal {
        return this.currentPrincipalSubject.getValue();
    }

    public hasSession(): boolean {
        return this.currentPrincipalSubject.getValue() !== null;
    }
}
