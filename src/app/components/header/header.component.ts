import {
    Component,
    Output,
    EventEmitter,
    OnInit,
    Inject,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs/Rx';

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
export class HeaderComponent implements OnInit {
    public userName: Observable<string>;
    public isAuthenticated: Observable<boolean>;

    @Output() public logoutRequested = new EventEmitter();

    public constructor(
        @Inject(authServiceToken) private readonly authService: AuthService,
        @Inject(usersServiceToken) private readonly usersService: UsersService
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

    private logout(): void {
        this.logoutRequested.emit();
    }

};
