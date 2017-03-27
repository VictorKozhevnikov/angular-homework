import { Component, OnInit, Inject } from '@angular/core';
import { Course, CoursesService, coursesServiceToken } from '../../../domain/courses/contract';

@Component({
    selector: 'courses-search-page',
    template: require('./search-page.component.html')
})
export class SearchPageComponent implements OnInit {
    private readonly coursesService: CoursesService;
    private courses: Array<Course>;

    public constructor(@Inject(coursesServiceToken) coursesService: CoursesService) {
        this.coursesService = coursesService;
    }

    public ngOnInit() {
        this.coursesService
            .getCourses()
            .then(courses => {
                this.courses = courses;
            });
    }

    private deleteCourse(course: Course): void {
        this.coursesService.deleteCourse(course.id);
    }
}
