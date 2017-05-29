import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { CourseCreateModule } from './create';
import { CourseEditModule } from './edit';
import { SearchPageModule } from './search';

import { couresesRoutes } from './courses.routes';

@NgModule({
    declarations: [CoursesComponent],
    imports: [
        CourseCreateModule,
        CourseEditModule,
        SearchPageModule,
        RouterModule.forChild(couresesRoutes)],
    exports: [
        CourseCreateModule,
        CourseEditModule,
        SearchPageModule]
})
export class CoursesModule {
    constructor() { }
}
