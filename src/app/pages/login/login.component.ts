import { Component, Inject } from '@angular/core';

import { AuthService, authServiceToken } from '../../domain/auth';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    public lastLoginFailed: boolean = false;

    public constructor(
        @Inject(authServiceToken) private readonly authService: AuthService
    )
    { }

    public login(userName: string, password: string) {
        this.authService
        .login(userName, password)
        .then(loginIsSuccessful => {
            this.lastLoginFailed = !loginIsSuccessful;
        });
    }

}
