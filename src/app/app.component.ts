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
        @Inject(authServiceToken) private readonly authService: AuthService
    ) { }

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);

        this.currentPage = this.pages.login;
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
