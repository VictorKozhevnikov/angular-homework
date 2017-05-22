import { NgModule } from '@angular/core';

import { CourseCreateModule } from './create';
import { SearchPageModule } from './search';

@NgModule({
    imports: [
        CourseCreateModule,
        SearchPageModule
        ],
    exports: [
        CourseCreateModule,
        SearchPageModule]
})
export class CoursesModule {
    constructor() { }
}
