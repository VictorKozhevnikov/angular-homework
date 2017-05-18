import { Observable } from 'rxjs/Observable';

import { Principal } from './principal';

export interface AuthService {

    userInfo: Observable<string>;

    currentPrincipal: Observable<Principal>;

    login(userName: string, password: string): Observable<boolean>;

    logout(): Observable<void>;

    IsAuthenticated(): boolean;

    GetUserInfo(): string;
}
