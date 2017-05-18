import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Principal } from './principal';

@Injectable()
export class UserSession {
    public currentPrincipal: Observable<Principal>;

    private currentPrincipalSubject: BehaviorSubject<Principal>
        = new BehaviorSubject<Principal>(null);

    public constructor() {
        this.currentPrincipal = this.currentPrincipalSubject.asObservable();
    }

    public beginSession(principal: Principal): void {
        this.currentPrincipalSubject.next(principal);
    }

    public endSession(): void {
        this.currentPrincipalSubject.next(null);
    }

    public getPrincipal(): Principal {
        return this.currentPrincipalSubject.getValue();
    }

    public hasSession(): boolean {
        return this.currentPrincipalSubject.getValue() !== null;
    }
}
