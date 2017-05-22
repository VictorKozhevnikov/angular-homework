import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs/Rx';

@Injectable()
export class DummyWorkService {
    public workStarted: Observable<void>;
    public workFinished: Observable<void>;

    private workStartedSubject: Subject<void>;
    private workFinishedSubject: Subject<void>;

    public constructor() {
        this.workStartedSubject = new Subject<void>();
        this.workStarted = this.workStartedSubject.asObservable();

        this.workFinishedSubject = new Subject<void>();
        this.workFinished = this.workFinishedSubject.asObservable();
    }

    public workOn<T>(result: Observable<T>, milliseconds: number = 500): Observable<T> {

        // make sure the work takes at least desired time
        const workObservable = result.combineLatest(Observable.timer(milliseconds), (r, _) => r);

        // capture the start of the work
        const startObservable = Observable.of(null).do(() => this.workStartedSubject.next());

        // capture the finish of the work
        const finishObservabele = Observable.of(null).do(() => this.workFinishedSubject.next());

        // the result is concatenation of all three
        const resultObservable = startObservable.ignoreElements()
            .concat(workObservable)
            .concat(finishObservabele.ignoreElements());

        return resultObservable;
    }
}
