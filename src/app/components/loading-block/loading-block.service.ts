import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoadingBlockService {
    public visible: Observable<boolean>;

    private visibleSubscriber: any;

    public constructor() {
        this.visible = new Observable<boolean>(subscriber => {
            this.visibleSubscriber = subscriber;
        });
    }

    public show(): void {
        if (this.visibleSubscriber) {
            this.visibleSubscriber.next(true);
        }
    }

    public hide(): void {
        if (this.visibleSubscriber) {
            this.visibleSubscriber.next(false);
        }
    }

    public block(milliseconds: number): Promise<void> {
        return new Promise<void>(resolve => {
            console.log('this is ' + this);
            this.show();
            setTimeout(
                () => {
                    console.log('this is ' + this);
                    this.hide();
                    resolve();
                },
                milliseconds);
        });
    }
}
