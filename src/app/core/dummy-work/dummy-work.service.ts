import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class DummyWorkService {

    public workOn<T>(result: Observable<T>, milliseconds: number = 500): Observable<T> {
        const timeout = Observable.timer(milliseconds);
        const workObservable = result.combineLatest(timeout, (r, _) => r);

        return workObservable;
    }
}
