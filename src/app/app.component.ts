/*
 * Angular 2 decorators and services
 */
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject
} from '@angular/core';
import { AppState } from './app.service';

import { AuthService, authServiceToken } from './domain/auth';
import { ProfilingService } from './core/profiling';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    template: require('./app.component.html'),
    styleUrls: [
        './app.component.scss',
        './course-list-item.scss'
    ]
})
export class AppComponent implements OnInit {

    public currentPage: string;
    public pages = {
        login: 'login',
        search: 'search',
    };

    constructor(
        public appState: AppState,
        @Inject(authServiceToken)
        private readonly authService: AuthService,
        private readonly profilingService: ProfilingService
    ) { }

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);

        this.currentPage = this.authService.IsAuthenticated()
            ? this.pages.search
            : this.pages.login;

        this.profilingService.beginProfiling();
    }

    public loginSucceeded() {
        this.currentPage = this.pages.search;
    }

    public logout() {
        this.authService
            .logout()
            .then(() => {
                this.currentPage = this.pages.login;
            });
    }

}
