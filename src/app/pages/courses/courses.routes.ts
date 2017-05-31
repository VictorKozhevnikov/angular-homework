import { Routes } from '@angular/router';

import { AuthGuard } from '../../domain/auth';

import { CoursesComponent } from './courses.component';
import { SearchPageComponent } from './search';
import { CourseCreateComponent } from './create';
import { courseEditRoute } from './edit';

export const couresesRoutes: Routes = [
    {
        path: 'courses',
        component: CoursesComponent,
        canActivate: [AuthGuard],
        data: {
            breadcrumb: 'Courses'
        },
        children: [
            {
                // search
                path: '',
                component: SearchPageComponent,
                data: {
                    breadcrumb: 'Search'
                }
            },
            {
                // create
                path: 'new',
                component: CourseCreateComponent,
                data: {
                    breadcrumb: 'Add course'
                }
            },
            courseEditRoute
        ]
    }
];
