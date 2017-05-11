import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingBlockService {
    public visible: Observable<boolean>;

    private isVisibleNow: boolean;
    private visibleId: number;
    private lastId: number = 0;
    private visibleSubscriber: any;

    public constructor() {
        this.visible = new Observable<boolean>(subscriber => {
            this.visibleSubscriber = subscriber;
        });
    }

    public show(): void {
        this.isVisibleNow = true;
        this.visibleId = ++this.lastId;

        if (this.visibleSubscriber) {
            this.visibleSubscriber.next(true);
        }
    }

    public hide(id?: number): void {
        if (id && id !== this.visibleId) {
            return;
        }

        this.isVisibleNow = false;
        this.visibleId = null;

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
                            const visibleId = this.visibleId;
                            setTimeout(
                                () => {
                                    this.hide(visibleId);
                                },
                                10);
                            resolve();
                        },
                        milliseconds);
                },
                0);
        });
    }
}
