import {
    Component,
    Inject,
    Output,
    OnDestroy,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';

import { Subject } from 'rxjs/Rx';

import { AuthService, authServiceToken } from '../../domain/auth';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnDestroy {

    public lastLoginFailed: boolean = false;
    @Output() public loginSucceeded = new EventEmitter();

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public constructor(
        @Inject(authServiceToken)
        private readonly authService: AuthService,
        private readonly changeDetector: ChangeDetectorRef
    ) { }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public login(userName: string, password: string) {
        this.authService
            .login(userName, password)
            .do(loginIsSuccessful => {
                this.lastLoginFailed = !loginIsSuccessful;
                this.changeDetector.markForCheck();
            })
            .takeUntil(this.ngUnsubscribe)
            .subscribe(loginIsSuccessful => {
                if (loginIsSuccessful) {
                    this.loginSucceeded.emit();
                }
            });
    }

}
