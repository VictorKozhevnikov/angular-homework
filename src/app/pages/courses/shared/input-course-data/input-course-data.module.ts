import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../../../../core';
import { InputAuthorsModule, DurationModule } from '../../../../components';
import { InputCourseDataComponent } from './input-course-data.component';

@NgModule({
    declarations: [InputCourseDataComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CoreModule,
        InputAuthorsModule,
        DurationModule],
    exports: [InputCourseDataComponent]
})
export class InputCourseDataModule {
    constructor() { }
}
