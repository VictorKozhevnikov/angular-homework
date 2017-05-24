import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../../../core';
import { DurationModule } from  '../../../components';

import { CourseCreateComponent } from './course-create.component';

@NgModule({
    declarations: [
        CourseCreateComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DurationModule,
        CoreModule],
    exports: [
        CourseCreateComponent]
})
export class CourseCreateModule {
    constructor() { }
}
