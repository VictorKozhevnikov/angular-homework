import {
    Component,
    ChangeDetectionStrategy,
    Inject,
    OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Rx';

import {
    CourseData,
    CoursesService,
    coursesServiceToken
} from '../../../domain/courses';

@Component({
    templateUrl: './course-create.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseCreateComponent implements OnDestroy {
    public readonly courseDataFormControl: FormControl;
    private readonly ngUnsubscribe = new Subject<void>();

    public constructor(
        @Inject(coursesServiceToken) private readonly coursesService: CoursesService,
        private readonly router: Router
    ) {
        this.courseDataFormControl = new FormControl(null, Validators.required);
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public save(courseData: CourseData): void {

        this.coursesService
            .createCourse(courseData)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(() => {
                this.router.navigate(['../']);
            });
    }
};
