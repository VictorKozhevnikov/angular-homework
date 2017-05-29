import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit,
    Inject
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { CourseData, CoursesService, coursesServiceToken } from '../../../domain/courses';

@Component({
    templateUrl: './course-edit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit {
    @Input() public courseId: number;
    @Output() public closed = new EventEmitter<void>();

    public readonly courseDataFormControl: FormControl;

    public constructor(
        @Inject(coursesServiceToken)
        private readonly coursesService: CoursesService
    ) {
        this.courseDataFormControl = new FormControl(null, Validators.required);
    }

    public ngOnInit(): void {
        this.coursesService
            .getCourse(this.courseId)
            .first()
            .subscribe(course => {
                const courseData = course.extractCourseData();
                this.courseDataFormControl.setValue(courseData);
            });
    }

    public save(courseData: CourseData): void {
        this.coursesService
            .updateCourse(this.courseId, courseData)
            .first()
            .subscribe(()=>{
                this.closed.emit();
            });
    }

    public cancel(): void {
        this.closed.emit();
    }
}
