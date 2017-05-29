import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
    Inject
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import {
    CourseData,
    CoursesService,
    coursesServiceToken
} from '../../../domain/courses';

@Component({
    templateUrl: './course-create.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCreateComponent {
    @Output() public closed = new EventEmitter<void>();

    public readonly courseDataFormControl: FormControl;

    public constructor(
        @Inject(coursesServiceToken)
        private readonly coursesService: CoursesService
    ) {
        this.courseDataFormControl = new FormControl(null, Validators.required);
    }

    public save(courseData: CourseData): void {

        this.coursesService
            .createCourse(courseData)
            .first()
            .subscribe(() => {
                this.closed.emit();
            });
    }

    public cancel(): void {
        this.closed.emit();
    }

};
