import { Component, OnInit, Inject } from '@angular/core';
import { Course, CoursesService, coursesServiceToken } from '../../../domain/courses/contract';
import { DeleteConfirmationComponent } from './delete-confirmation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter';

@Component({
    selector: 'courses-search-page',
    template: require('./search-page.component.html'),
    providers: [FilterPipe]
})
export class SearchPageComponent implements OnInit {
    private courses: Array<Course>;

    public constructor(
        @Inject(coursesServiceToken)
        private readonly coursesService: CoursesService,
        private readonly ngbModal: NgbModal,
        private readonly filterPipe: FilterPipe
    ) {
    }

    public ngOnInit() {
        this.update();
    }

    private deleteCourse(course: Course): void {
        let modalRef = this.ngbModal
            .open(DeleteConfirmationComponent);

        modalRef.componentInstance.course = course;

        modalRef.result
            .then(shouldDelete => {
                if (shouldDelete) {
                    return this.coursesService
                        .deleteCourse(course.id)
                        .then(() => this.update());
                }
            });

    }

    private filterChanged(filterText: string): void {
        this.update(filterText);
    }

    private update(filterText: string = '') {
        this.coursesService
            .getCourses()
            .then(courses => {
                return this.filterPipe.transform(courses, filterText);
            })
            .then(courses => {
                this.courses = courses;
            });
    }
}
