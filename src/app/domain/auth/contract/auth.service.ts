import { Observable } from 'rxjs/Observable';

export interface AuthService {

    userInfo: Observable<string>;

    login(userName: string, password: string): Observable<boolean>;

    logout(): Observable<void>;

    IsAuthenticated(): boolean;

    GetUserInfo(): string;
}
