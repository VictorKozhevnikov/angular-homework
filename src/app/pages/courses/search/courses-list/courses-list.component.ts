import { Component, Input } from  '@angular/core';
import { Course } from '../../../../domain/courses';

@Component({
    selector: 'courses-list',
    template: require('./courses-list.component.html')
})
export class CoursesListComponent {
    @Input() public courses: Array<Course>;
}
