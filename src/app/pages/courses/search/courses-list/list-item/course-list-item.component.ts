import { Component, Input } from  '@angular/core';
import { Course } from '../../../../../domain/courses';

@Component({
    selector: 'course-list-item',
    template: require('./course-list-item.component.html'),
})
export class CourseListItemComponent {
    @Input() public course: Course;
}
