export interface AuthService {

    login(userName: string, password: string): Promise<boolean>;

    logout(): Promise<void>;

    IsAuthenticated(): boolean;

    GetUserInfo(): string;
}
