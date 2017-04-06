import { Observable } from 'rxjs/Observable';

export interface AuthService {

    login(userName: string, password: string): Promise<boolean>;

    logout(): Promise<void>;

    IsAuthenticated(): boolean;

    GetUserInfo(): string;

    GetUserObservable(): Observable<string>;
}
