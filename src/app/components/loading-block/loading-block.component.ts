import {
    Component,
    Input,
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'loading-block',
    template: `
        <div class="backdrop" *ngIf="visible">
            <div class="loader">
                Loading...
            </div>
        </div>`,
    styleUrls: [
        './loading-block.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingBlockComponent {
    @Input() public visible: boolean;
};
