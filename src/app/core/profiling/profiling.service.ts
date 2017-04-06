import {
    Injectable,
    NgZone
} from '@angular/core';

@Injectable()
export class ProfilingService {
    private timeElapsed: number = 0;

    public constructor(
        private readonly ngZone: NgZone
    ) { }

    public beginProfiling(): void {
        let beginTime: Date = null;

        this.ngZone.onUnstable.subscribe(() => {
            beginTime = new Date();
        });

        this.ngZone.onStable.subscribe(() => {
            if (beginTime === null) {
                console.log('begin time is null');
                return;
            }

            const currentTime = new Date();
            const timeDelta = currentTime.valueOf() - beginTime.valueOf();
            this.timeElapsed += timeDelta;
            beginTime = null;

            console.log('time delta: ' + timeDelta + ' ms');
        });
    }

    public getTimeElapsed() {
        return this.timeElapsed;
    }
}
