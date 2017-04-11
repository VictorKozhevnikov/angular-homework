import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'toolbox',
    template: require('./toolbox.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent {
    @Output() public filterChanged: EventEmitter<string> = new EventEmitter<string>();
    private text: string;

    private search(text: string): void {
        this.filterChanged.emit(text);
    }
}
