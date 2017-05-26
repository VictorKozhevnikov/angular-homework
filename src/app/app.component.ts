/*
 * Angular 2 decorators and services
 */
import {
    Component,
    OnInit,
    OnDestroy,
    ViewEncapsulation,
    Inject
} from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';

import { AppState } from './app.service';

import { AuthService, authServiceToken } from './domain/auth';
import { DummyWorkService } from './core';
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
export class AppComponent implements OnInit, OnDestroy {
    public currentPage: string;
    public courseId: number;

    public pages = {
        login: 'login',
        search: 'search',
        addCourse: 'addCourse',
        editCourse: 'editCourse'
    };

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        public appState: AppState,
        @Inject(authServiceToken)
        private readonly authService: AuthService,
        private readonly loadingBlockService: LoadingBlockService,
        private readonly dummyWorkService: DummyWorkService
    ) { }

    public ngOnInit(): void {
        console.log('Initial App State', this.appState.state);

        this.currentPage = this.authService.IsAuthenticated()
            ? this.pages.search
            : this.pages.login;

        this.dummyWorkService.workStarted
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => this.loadingBlockService.workStarted());
        this.dummyWorkService.workFinished
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => this.loadingBlockService.workFinished());
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public loginSucceeded() {
        this.currentPage = this.pages.search;
    }

    public logout() {
        this.authService
            .logout()
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => {
                this.currentPage = this.pages.login;
            });
    }

    public addCourse(): void {
        this.currentPage = this.pages.addCourse;
    }

    public editCourse(courseId: number): void {
        this.currentPage = this.pages.editCourse;
        this.courseId = courseId;
    }

    public createPageClosed(): void {
        this.currentPage = this.pages.search;
    }

    public editPageClosed(): void {
        this.currentPage = this.pages.search;
    }

}
