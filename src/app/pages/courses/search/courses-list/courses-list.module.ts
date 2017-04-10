import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from './courses-list.component';
import { CourseListItemModule } from  './list-item';

@NgModule({
    declarations: [
        CoursesListComponent
        ],
    imports: [CourseListItemModule, CommonModule],
    exports: [CoursesListComponent]
})
export class CoursesListModule {
    constructor() { }
}
