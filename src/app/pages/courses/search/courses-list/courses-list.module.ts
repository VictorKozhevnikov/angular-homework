import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list.component';
import { CourseListItemComponent } from './list-item/course-list-item.component';

@NgModule({
    declarations: [CoursesListComponent, CourseListItemComponent],
    imports: [CommonModule],
    exports: [CoursesListComponent]
})
export class CoursesListModule {
    constructor() { }
}
