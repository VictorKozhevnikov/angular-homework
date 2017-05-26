import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CourseData } from '../../../domain/courses';

@Component({
    selector: 'course-edit-page',
    templateUrl: './course-edit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent {
    @Input() public courseId: number;
    @Output() public closed = new EventEmitter<void>();

    public readonly courseDataFormControl: FormControl;

    public constructor() {
        this.courseDataFormControl = new FormControl();
    }

    public save(courseData: CourseData): void {
        this.closed.emit();
    }

    public cancel(): void {
        this.closed.emit();
    }
}
