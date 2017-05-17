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
        @Inject(authServiceToken)
        private readonly authService: AuthService
    ) { }

    public ngOnInit(): void {
        this.userName = this.authService.userInfo
            .map(name => name || 'Anonymous');
        this.isAuthenticated = this.authService.userInfo
            .map(name => !!name);
    }

    private logout(): void {
        this.logoutRequested.emit();
    }

};
