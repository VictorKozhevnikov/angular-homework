import { CourseEditComponent } from './course-edit.component';
import { CourseResolver } from './course-resolver';

export const courseEditRoute = {
    // edit
    path: ':courseId',
    component: CourseEditComponent,
    resolve: {
        course: CourseResolver
    }
};
