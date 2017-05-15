import { Component, Output, OnInit, Inject, EventEmitter } from '@angular/core';
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
    @Output() public addCourseRequested: EventEmitter<void> = new EventEmitter<void>();
    public courses: Array<Course>;

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

    public addCourse() {
        this.addCourseRequested.emit();
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
                        .subscribe(() => this.update());
                }
            });

    }

    private filterChanged(filterText: string): void {
        this.update(filterText);
    }

    private update(filterText: string = '') {
        // make service parameters
        const numberOfDays = 14;
        const beginDate = new Date();
        beginDate.setDate(beginDate.getDate() - numberOfDays);

        // call the service
        this.coursesService
            .getLatestCourses({ beginDate })
            .map(courses => {
                return this.filterPipe.transform(courses, filterText);
            })
            .subscribe(courses => {
                this.courses = courses;
            });
    }
}
