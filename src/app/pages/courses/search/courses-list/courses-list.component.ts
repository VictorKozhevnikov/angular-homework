import {
    Component,
    Input,
    Output,
    EventEmitter,
    ChangeDetectionStrategy
} from '@angular/core';
import { Course } from '../../../../domain/courses/contract';

@Component({
    selector: 'courses-list',
    template: require('./courses-list.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent {
    @Input() public courses: Array<Course>;
    @Output() public delete = new EventEmitter<Course>();

    private deleteCourse(Course: Course): void {
        this.delete.emit(Course);
    }
}
