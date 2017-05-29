import {
    Component,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
    Inject,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs/Rx';

import { AuthService, authServiceToken } from '../../domain/auth';
import { UsersService, usersServiceToken } from '../../domain/users';

@Component({
    selector: 'courses-header',
    template: require('./header.component.html'),
    styleUrls: [
        './header.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, OnDestroy {
    public userName: Observable<string>;
    public isAuthenticated: Observable<boolean>;

    private ngUnsubscribe = new Subject<void>();

    public constructor(
        @Inject(authServiceToken) private readonly authService: AuthService,
        @Inject(usersServiceToken) private readonly usersService: UsersService,
        private readonly router: Router
    ) { }

    public ngOnInit(): void {
        this.userName = this.authService.currentPrincipal
            .switchMap(principal => principal
                ? this.usersService.getUser(principal.userId)
                : Observable.of(null))
            .map(user => user
                ? user.name
                : 'Anonymous');

        this.isAuthenticated = this.authService.currentPrincipal
            .map(principal => !!principal);
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private logout(): void {
        this.authService.logout()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => this.router.navigate(['/login']));
    }

};
