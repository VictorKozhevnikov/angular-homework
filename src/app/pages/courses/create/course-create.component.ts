import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CourseData } from '../../../domain/courses';

@Component({
    selector: 'course-create-page',
    templateUrl: './course-create.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCreateComponent {
    @Output() public closed = new EventEmitter<void>();

    public courseData: CourseData;
    public courseForm: FormGroup;

    public constructor(
        private readonly formBuilder: FormBuilder
    ) {
        this.courseData = {
            title: null,
            description: null,
            beginTime: null,
            duration: null,
            isTopRated: null
        };

        this.courseForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(50)] ],
            isTopRated: [false, Validators.required],
            description: ['', [Validators.required, Validators.maxLength(500)]]
        });

    }

    public save(): void {
        this.closed.emit();
    }

    public cancel(): void {
        this.closed.emit();
    }

};
