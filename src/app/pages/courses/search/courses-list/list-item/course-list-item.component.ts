import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';
import { Course } from '../../../../../domain/courses/contract';

@Component({
    selector: 'course-list-item',
    template: require('./course-list-item.component.html'),
    styleUrls: [
        './course-list-item.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseListItemComponent {
    @Input() public course: Course;

    @Output() public delete = new EventEmitter<Course>();
    @Output() public edit = new EventEmitter<Course>();

    public deleteCourse(course: Course): void {
        this.delete.emit(course);
    }

    public editCourse(course: Course): void {
        this.edit.emit(course);
    }

}
