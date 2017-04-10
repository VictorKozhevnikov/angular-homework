import { NgModule } from '@angular/core';
import { CourseListItemComponent } from './course-list-item.component';
import {
    BorderByDateDirective
} from './border-by-date/border-by-date.directive';

@NgModule({
    declarations: [
        CourseListItemComponent,
        BorderByDateDirective],
    imports: [],
    exports: [CourseListItemComponent]
})
export class CourseListItemModule {
    public constructor() { }
}
