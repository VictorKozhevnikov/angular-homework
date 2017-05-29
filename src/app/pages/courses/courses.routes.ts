import { Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { SearchPageComponent } from './search';
import { CourseCreateComponent } from './create';
import { CourseEditComponent } from './edit';

export const couresesRoutes: Routes = [
    {
        path: 'courses',
        component: CoursesComponent,
        children: [
            {
                // search
                path: '',
                component: SearchPageComponent
            },
            {
                // create
                path: 'new',
                component: CourseCreateComponent,
            },
            {
                // edit
                path: ':courseId',
                component: CourseEditComponent
            }
        ]
    }
];
