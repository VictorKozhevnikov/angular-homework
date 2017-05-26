import { NgModule } from '@angular/core';

import { CourseCreateModule } from './create';
import { CourseEditModule } from './edit';
import { SearchPageModule } from './search';

@NgModule({
    imports: [
        CourseCreateModule,
        CourseEditModule,
        SearchPageModule
        ],
    exports: [
        CourseCreateModule,
        CourseEditModule,
        SearchPageModule]
})
export class CoursesModule {
    constructor() { }
}
