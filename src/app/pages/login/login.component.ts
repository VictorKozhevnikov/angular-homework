import {
    Component,
    Inject,
    Output,
    OnDestroy,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';

import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';

import { Subject } from 'rxjs/Rx';

import { AuthService, authServiceToken } from '../../domain/auth';

@Component({
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnDestroy {

    public lastLoginFailed: boolean = false;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public constructor(
        @Inject(authServiceToken)
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public login(form: NgForm) {
        const userName: string = form.value.userName;
        const password: string = form.value.password;

        this.authService
            .login(userName, password)
            .do(loginIsSuccessful => {
                this.lastLoginFailed = !loginIsSuccessful;
            })
            .takeUntil(this.ngUnsubscribe)
            .subscribe(loginIsSuccessful => {
                if (loginIsSuccessful) {
                    this.router.navigate(['/courses']);
                }
                form.setValue({
                    userName: '',
                    password: ''
                });
            });
    }

}
