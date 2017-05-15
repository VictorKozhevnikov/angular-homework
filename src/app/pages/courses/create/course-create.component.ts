import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';

import { CourseData } from '../../../domain/courses';

@Component({
    selector: 'course-create-page',
    templateUrl: './course-create.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCreateComponent {
    @Output() public closed = new EventEmitter<void>();

    public courseData: CourseData;

    public constructor() {
        this.courseData = {
            title: null,
            description: null,
            beginTime: null,
            duration: null,
            isTopRated: null
        };
    }

    public save(): void {
        this.closed.emit();
    }

    public cancel(): void {
        this.closed.emit();
    }

};
