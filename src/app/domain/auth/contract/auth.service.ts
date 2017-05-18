import { Observable } from 'rxjs/Observable';

import { Principal } from './principal';

export interface AuthService {

    currentPrincipal: Observable<Principal>;

    login(userName: string, password: string): Observable<boolean>;

    logout(): Observable<void>;

    IsAuthenticated(): boolean;
}
