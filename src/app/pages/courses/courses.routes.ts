import { Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { SearchPageComponent } from './search';
import { CourseCreateComponent } from './create';
import { courseEditRoute } from './edit';

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
            courseEditRoute
        ]
    }
];
