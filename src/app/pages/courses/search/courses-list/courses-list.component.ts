import { Component, Input, Output, EventEmitter } from  '@angular/core';
import { Course } from '../../../../domain/courses';

@Component({
    selector: 'courses-list',
    template: require('./courses-list.component.html')
})
export class CoursesListComponent {
    @Input() public courses: Array<Course>;
    @Output() public delete = new EventEmitter<Course>();

    private deleteCourse(Course): void{
        this.delete.emit(Course);
    }
}
