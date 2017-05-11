/*
 * Angular 2 decorators and services
 */
import {
    Component,
    OnInit,
    ViewEncapsulation,
    Inject
} from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { AppState } from './app.service';

import { AuthService, authServiceToken } from './domain/auth';
import { ProfilingService, DummyWorkService } from './core';
import { LoadingBlockService } from './components';

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    template: require('./app.component.html'),
    styleUrls: [
        './app.component.scss'
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
        private readonly profilingService: ProfilingService,
        private readonly loadingBlockService: LoadingBlockService,
        private readonly dummyWorkService: DummyWorkService
    ) { }

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);

        this.currentPage = this.authService.IsAuthenticated()
            ? this.pages.search
            : this.pages.login;

        this.dummyWorkService.workStarted.subscribe(_ => this.loadingBlockService.workStarted());
        this.dummyWorkService.workFinished.subscribe(_ => this.loadingBlockService.workFinished());
    }

    public loginSucceeded() {
        this.currentPage = this.pages.search;
    }

    public logout() {
        this.authService
            .logout()
            .subscribe(() => {
                this.currentPage = this.pages.login;
            });
    }

}
