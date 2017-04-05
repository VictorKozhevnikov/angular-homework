import {
    Component,
    Output,
    EventEmitter,
    OnInit,
    Inject,
    ChangeDetectionStrategy
} from '@angular/core';

import { AuthService, authServiceToken } from '../../domain/auth';

@Component({
    selector: 'courses-header',
    template: require('./header.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public isAnonymous: boolean;
    public isAuthenticated: boolean;
    public userName: string;

    @Output() public logoutRequested = new EventEmitter();

    public constructor(
        @Inject(authServiceToken) private readonly authService: AuthService
    ) { }

    public ngOnInit(): void {
        this.isAuthenticated = this.authService.IsAuthenticated();
        this.isAnonymous = !this.authService.IsAuthenticated();
        this.userName = this.authService.GetUserInfo();
    }

    private logout(): void {
        this.logoutRequested.emit();
    }

};
