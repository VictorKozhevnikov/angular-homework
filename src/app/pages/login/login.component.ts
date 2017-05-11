import {
    Component,
    Inject,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';

import { AuthService, authServiceToken } from '../../domain/auth';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

    public lastLoginFailed: boolean = false;

    @Output() public loginSucceeded = new EventEmitter();

    public constructor(
        @Inject(authServiceToken)
        private readonly authService: AuthService
    ) { }

    public login(userName: string, password: string) {
        this.authService
            .login(userName, password)
            .do(loginIsSuccessful => {
                this.lastLoginFailed = !loginIsSuccessful;
            })
            .subscribe(loginIsSuccessful => {
                if (loginIsSuccessful) {
                    this.loginSucceeded.emit();
                }
            });
    }

}
