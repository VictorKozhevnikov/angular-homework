import { Component, Input, Output, EventEmitter } from  '@angular/core';
import { Course } from '../../../../../domain/courses/contract';

@Component({
    selector: 'course-list-item',
    template: require('./course-list-item.component.html'),
})
export class CourseListItemComponent {
    @Input() public course: Course;

    @Output() public delete = new EventEmitter<Course>();

    private deleteCourse(course: Course): void {
        this.delete.emit(course);
    }

}
