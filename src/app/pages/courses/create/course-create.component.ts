import {
    Component,
    ChangeDetectionStrategy,
    Output,
    EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyDateInputDirective, dateValidator } from '../../../core/input/date';

import { CourseData } from '../../../domain/courses';

@Component({
    selector: 'course-create-page',
    templateUrl: './course-create.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCreateComponent {
    @Output() public closed = new EventEmitter<void>();

    public readonly dateFormat: string = 'MM/DD/YYYY';
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
            title: ['', [Validators.required, Validators.maxLength(50)]],
            isTopRated: [false, Validators.required],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            beginTime: [new Date(), Validators.required],
            duration: [0, Validators.required]
        });

    }

    public save(): void {
        this.closed.emit();
    }

    public cancel(): void {
        this.closed.emit();
    }

};
