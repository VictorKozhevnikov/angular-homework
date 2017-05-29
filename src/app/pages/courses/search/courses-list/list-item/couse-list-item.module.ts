import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DurationModule } from '../../../../../components';
import { CourseListItemComponent } from './course-list-item.component';
import {
    BorderByDateDirective
} from './border-by-date/border-by-date.directive';

@NgModule({
    declarations: [
        CourseListItemComponent,
        BorderByDateDirective],
    imports: [
        RouterModule.forChild([]),
        CommonModule,
        DurationModule],
    exports: [CourseListItemComponent]
})
export class CourseListItemModule {
    public constructor() { }
}
