import {
    Component,
    ChangeDetectionStrategy,
    OnInit
} from '@angular/core';

import { Observable } from 'rxjs/Rx';

import { LoadingBlockService } from './loading-block.service';

@Component({
    selector: 'loading-block',
    template: `
        <div class="backdrop" *ngIf="isVisible | async">
            <div class="loader">
                Loading...
            </div>
        </div>`,
    styleUrls: [
        './loading-block.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBlockComponent implements OnInit {
    public isVisible: Observable<boolean>;

    public constructor(
        private readonly loadingBlockService: LoadingBlockService) {
    }

    public ngOnInit() {
        this.isVisible = this.loadingBlockService.blockIsVisible;
    }

};
