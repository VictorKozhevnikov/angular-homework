import { Observable } from 'rxjs/Observable';

export interface AuthService {

    userInfo: Observable<string>;

    login(userName: string, password: string): Promise<boolean>;

    logout(): Promise<void>;

    IsAuthenticated(): boolean;

    GetUserInfo(): string;
}
