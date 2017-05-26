import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { InputCourseDataModule } from '../shared/input-course-data';

import { CourseEditComponent } from './course-edit.component';

@NgModule({
    declarations: [CourseEditComponent],
    imports: [
        InputCourseDataModule,
        ReactiveFormsModule],
    exports: [CourseEditComponent]
})
export class CourseEditModule {
    constructor() { }
}
