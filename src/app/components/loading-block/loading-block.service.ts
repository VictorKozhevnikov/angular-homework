import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';

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

        // Igrore unsubscription. Subscribe forever
        visibleObservable.subscribe(visibleSubject);

        this.blockIsVisible = visibleSubject.asObservable();
    }

    public show(): void {
        this.showSubject.next();
    }

    public hide(id?: number): void {
        this.hideSubject.next();
    }

}
