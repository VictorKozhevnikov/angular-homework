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
    @Output() public addCourseRequested: EventEmitter<void> = new EventEmitter<void>();
    private text: string;

    public search(text: string): void {
        this.filterChanged.emit(text);
    }

    public addCourse(): void {
        this.addCourseRequested.emit();
    }
}
