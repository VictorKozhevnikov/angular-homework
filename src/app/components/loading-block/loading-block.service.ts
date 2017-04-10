import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingBlockService {
    public visible: Observable<boolean>;

    private isVisibleNow: boolean;
    private visibleSubscriber: any;

    public constructor() {
        this.visible = new Observable<boolean>(subscriber => {
            this.visibleSubscriber = subscriber;
        });
    }

    public show(): void {
        this.isVisibleNow = true;
        if (this.visibleSubscriber) {
            this.visibleSubscriber.next(true);
        }
    }

    public hide(): void {
        this.isVisibleNow = false;
        if (this.visibleSubscriber) {
            this.visibleSubscriber.next(false);
        }
    }

    public block(milliseconds: number): Promise<void> {
        return new Promise<void>(resolve => {
            setTimeout(
                () => {
                    this.show();
                    setTimeout(
                        () => {
                            this.hide();
                            resolve();
                        },
                        milliseconds);
                },
                0);
        });
    }
}
