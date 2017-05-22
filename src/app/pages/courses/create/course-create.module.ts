import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DurationModule } from  '../../../components';

import { CourseCreateComponent } from './course-create.component';

@NgModule({
    declarations: [
        CourseCreateComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DurationModule],
    exports: [
        CourseCreateComponent]
})
export class CourseCreateModule {
    constructor() { }
}
