import { Route } from '@angular/router';

import { CourseEditComponent } from './course-edit.component';
import { CourseResolver } from './course-resolver';

export const courseEditRoute: Route = {
    // edit
    path: ':courseId',
    component: CourseEditComponent,
    resolve: {
        course: CourseResolver
    },
    data: {
        breadcrumb: 'Edit course'
    }
};
