import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputCourseDataModule } from '../shared/input-course-data';

import { CourseEditComponent } from './course-edit.component';

@NgModule({
    declarations: [CourseEditComponent],
    imports: [
        CommonModule,
        InputCourseDataModule,
        ReactiveFormsModule],
    exports: [CourseEditComponent]
})
export class CourseEditModule {
    constructor() { }
}
