import { Component, OnInit, Inject } from '@angular/core';
import { Course, CoursesService, coursesServiceToken } from '../../../domain/courses/contract';
import { DeleteConfirmationComponent } from './delete-confirmation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'courses-search-page',
    template: require('./search-page.component.html')
})
export class SearchPageComponent implements OnInit {
    private readonly coursesService: CoursesService;
    private readonly modalService: NgbModal;
    private courses: Array<Course>;

    public constructor(
        @Inject(coursesServiceToken) coursesService: CoursesService,
        modalService: NgbModal
    ) {
        this.coursesService = coursesService;
        this.modalService = modalService;
    }

    public ngOnInit() {
        this.update();
    }

    private deleteCourse(course: Course): void {
        this.modalService
            .open(DeleteConfirmationComponent);
            // .result
            // .then(shouldDelete => {
            //     if (shouldDelete) {
            //         return this.coursesService
            //             .deleteCourse(course.id)
            //             .then(this.update);
            //     }
            // });
    }

    private update() {
        this.coursesService
            .getCourses()
            .then(courses => {
                this.courses = courses;
            });
    }
}
