import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DurationModule } from  '../../../components';

import { CourseCreateComponent } from './course-create.component';

@NgModule({
    declarations: [
        CourseCreateComponent],
    imports: [
        CommonModule,
        FormsModule,
        DurationModule],
    exports: [
        CourseCreateComponent]
})
export class CourseCreateModule {
    constructor() { }
}