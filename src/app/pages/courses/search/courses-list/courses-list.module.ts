import { NgModule } from '@angular/core';
import { CoursesListComponent } from './courses-list.component';
import { CourseListItemComponent } from './list-item/course-list-item.component';

@NgModule({
    declarations: [CoursesListComponent, CourseListItemComponent],
    imports: [],
    exports: [CoursesListComponent]
})
export class CoursesListModule {
    constructor() { }
}
