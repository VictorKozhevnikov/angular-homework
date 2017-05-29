import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit,
    OnDestroy,
    Inject
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Rx';

import { Course, CourseData, CoursesService, coursesServiceToken } from '../../../domain/courses';

@Component({
    templateUrl: './course-edit.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseEditComponent implements OnInit, OnDestroy {
    public readonly courseDataFormControl: FormControl;
    private course: Course;
    private readonly ngUnsubscribe = new Subject<void>();

    public constructor(
        @Inject(coursesServiceToken) private readonly coursesService: CoursesService,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute
    ) {
        this.courseDataFormControl = new FormControl(null, Validators.required);
    }

    public ngOnInit(): void {
        this.course = this.activatedRoute.snapshot.data['course'];
        const courseData = this.course.extractCourseData();
        this.courseDataFormControl.setValue(courseData);
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public save(courseData: CourseData): void {
        this.coursesService
            .updateCourse(this.course.id, courseData)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => {
                this.router.navigate(['../']);
            });
    }
}
