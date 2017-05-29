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
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        public appState: AppState,
        private readonly loadingBlockService: LoadingBlockService,
        private readonly dummyWorkService: DummyWorkService
    ) { }

    public ngOnInit(): void {
        console.log('Initial App State', this.appState.state);

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
}
