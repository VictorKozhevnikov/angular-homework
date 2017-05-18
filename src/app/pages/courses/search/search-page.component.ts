import { Component, Output, OnInit, Inject, EventEmitter } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

import { Course, CoursesService, coursesServiceToken } from '../../../domain/courses/contract';
import { DeleteConfirmationComponent } from './delete-confirmation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter';
import { OrderByPipe } from '../../../components/order-by';

@Component({
    selector: 'courses-search-page',
    template: require('./search-page.component.html'),
    providers: [FilterPipe, OrderByPipe]
})
export class SearchPageComponent implements OnInit {
    @Output() public addCourseRequested: EventEmitter<void> = new EventEmitter<void>();
    public courses: Observable<Array<Course>>;

    private listChanged: Subject<void> = new Subject<void>();
    private filters: Subject<string> = new Subject<string>();

    public constructor(
        @Inject(coursesServiceToken)
        private readonly coursesService: CoursesService,
        private readonly ngbModal: NgbModal,
        private readonly filterPipe: FilterPipe,
        private readonly orderByPipe: OrderByPipe
    ) {
    }

    public ngOnInit() {
        const numberOfDays = 14;

        this.courses = this.filters
            .startWith('')
            .debounceTime(500)
            .map(text => text.trim())
            .distinctUntilChanged()
            .switchMap(text => {
                // make service parameters
                const beginDate = new Date();
                beginDate.setDate(beginDate.getDate() - numberOfDays);

                return this.coursesService.searchCourses({
                    text,
                    beginDate
                });
            });
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
                        .subscribe(() => this.listChanged.next());
                }
            });

    }

    private filterChanged(filterText: string): void {
        this.filters.next(filterText);
    }
}
