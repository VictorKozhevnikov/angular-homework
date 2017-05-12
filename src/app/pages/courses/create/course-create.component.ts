import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';

@Component({
    selector: 'course-create-page',
    templateUrl: './course-create.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCreateComponent {
    @Output() public closed = new EventEmitter<void>();

    public save(): void {
        this.closed.emit();
    }

    public cancel(): void {
        this.closed.emit();
    }

};
