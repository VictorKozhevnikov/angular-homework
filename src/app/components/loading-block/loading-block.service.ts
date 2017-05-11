import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';

// actually the LoadingBlockService does two functions
//  - it tracks currently running operations
//  - it decides when to show and hide the blocking component
@Injectable()
export class LoadingBlockService {

    public blockIsVisible: Observable<boolean>;

    private showSubject = new Subject<void>();
    private hideSubject = new Subject<void>();

    public constructor() {
        const visibleObservable = this.showSubject.map(_ => 1)
            .merge(this.hideSubject.map(_ => -1))
            .scan((numberOfOperations, item) => numberOfOperations += item)
            .map(numberOfOperations => numberOfOperations > 0)
            .startWith(false)
            .distinctUntilChanged();

        const visibleSubject = new ReplaySubject<boolean>(1);

        visibleObservable.subscribe(visibleSubject);

        this.blockIsVisible = visibleSubject.asObservable();
    }

    public workStarted(): void {
        this.showSubject.next();
    }

    public workFinished(id?: number): void {
        this.hideSubject.next();
    }

}
