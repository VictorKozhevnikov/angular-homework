import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputCourseDataModule } from '../shared/input-course-data';

import { CourseEditComponent } from './course-edit.component';
import { CourseResolver } from './course-resolver';

@NgModule({
    declarations: [CourseEditComponent],
    imports: [
        RouterModule.forChild([]),
        CommonModule,
        InputCourseDataModule,
        ReactiveFormsModule],
    exports: [CourseEditComponent],
    providers: [CourseResolver]
})
export class CourseEditModule {
    constructor() { }
}
