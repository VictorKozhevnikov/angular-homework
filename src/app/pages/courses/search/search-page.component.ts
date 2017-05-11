import { Component, OnInit, Inject } from '@angular/core';
import { Course, CoursesService, coursesServiceToken } from '../../../domain/courses/contract';
import { DeleteConfirmationComponent } from './delete-confirmation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'courses-search-page',
    template: require('./search-page.component.html')
})
export class SearchPageComponent implements OnInit {
    public courses: Array<Course>;

    private readonly coursesService: CoursesService;
    private readonly ngbModal: NgbModal;

    public constructor(
        @Inject(coursesServiceToken) coursesService: CoursesService,
        modalService: NgbModal
    ) {
        this.coursesService = coursesService;
        this.ngbModal = modalService;
    }

    public ngOnInit() {
        this.update();
    }

    public deleteCourse(course: Course): void {
        let modalRef = this.ngbModal
            .open(DeleteConfirmationComponent);

        modalRef.componentInstance.course = course;

        modalRef.result
            .then(shouldDelete => {
                if (shouldDelete) {
                    return this.coursesService
                        .deleteCourse(course.id)
                        .then(this.update);
                }
            });

    }

    public update() {
        this.coursesService
            .getCourses()
            .then(courses => {
                this.courses = courses;
            });
    }
}
