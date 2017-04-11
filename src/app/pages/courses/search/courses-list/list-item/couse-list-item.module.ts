import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListItemComponent } from './course-list-item.component';
import {
    BorderByDateDirective
} from './border-by-date/border-by-date.directive';

@NgModule({
    declarations: [
        CourseListItemComponent,
        BorderByDateDirective],
    imports: [CommonModule],
    exports: [CourseListItemComponent]
})
export class CourseListItemModule {
    public constructor() { }
}
