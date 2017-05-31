import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Course, CoursesService, coursesServiceToken } from '../../../domain/courses';

@Injectable()
export class CourseResolver implements Resolve<Course> {
    public constructor(
        @Inject(coursesServiceToken) private readonly coursesService: CoursesService
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
        const courseIdString = route.params['courseId'];
        const courseId: number = +courseIdString;
        return this.coursesService.getCourse(courseId);
    }
}
