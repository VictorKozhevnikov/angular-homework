import {
    Component,
    Output,
    EventEmitter,
    OnInit,
    Inject,
    ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';

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
    public isAnonymous: boolean;
    public isAuthenticated: boolean;
    public userName: string;

    @Output() public logoutRequested = new EventEmitter();

    public constructor(
        @Inject(authServiceToken)
        private readonly authService: AuthService,
        private readonly changeDetector: ChangeDetectorRef
    ) { }

    public ngOnInit(): void {
        // first time get user info from service
        this.isAuthenticated = this.authService.IsAuthenticated();
        this.isAnonymous = !this.authService.IsAuthenticated();
        this.userName = this.authService.GetUserInfo();

        this.authService.userInfo.subscribe(userName => {
            // other times get user info from observable
            this.userName = userName;
            this.isAuthenticated = userName !== null;
            this.isAnonymous = userName == null;

            this.changeDetector.markForCheck();
        });
    }

    private logout(): void {
        this.logoutRequested.emit();
    }

};
