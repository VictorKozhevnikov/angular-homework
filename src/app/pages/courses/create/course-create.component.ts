import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter,
    Inject
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyDateInputDirective } from '../../../core/input/date';

import {
    CourseData,
    CoursesService,
    coursesServiceToken,
    minimumAuthorsCountValidator
} from '../../../domain/courses';

@Component({
    selector: 'course-create-page',
    templateUrl: './course-create.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCreateComponent {
    @Output() public closed = new EventEmitter<void>();

    public readonly dateFormat: string = 'MM/DD/YYYY';
    public courseForm: FormGroup;

    public constructor(
        private readonly formBuilder: FormBuilder,
        @Inject(coursesServiceToken)
        private readonly coursesService: CoursesService
    ) {
        this.courseForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(50)]],
            isTopRated: [false, Validators.required],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            beginTime: [new Date(), Validators.required],
            duration: [0, Validators.required],
            authors: [[], minimumAuthorsCountValidator(1)]
        });

    }

    public save(value: any): void {
        const courseData: CourseData = {
            title: value.title,
            isTopRated: value.isTopRated,
            description: value.description,
            beginTime: value.beginTime,
            duration: value.duration,
            authors: value.authors
        };

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
