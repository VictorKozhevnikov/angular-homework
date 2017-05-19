import { Component, Output, OnInit, Inject, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, Observable } from 'rxjs/Rx';

import { Course, CoursesService, coursesServiceToken } from '../../../domain/courses/contract';
import { PaginationMore, defaultFetch, Page, PaginationState } from '../../../core/pagination/more';

import { DeleteConfirmationComponent } from './delete-confirmation';
import { Filters } from './filters';

@Component({
    selector: 'courses-search-page',
    template: require('./search-page.component.html')
})
export class SearchPageComponent implements OnInit {
    private static readonly pageSize: number = 5;
    private static readonly daysInAdvance: number = 14;
    private static readonly initialFilters: Filters = {
        text: ''
    };

    @Output() public addCourseRequested = new EventEmitter<void>();
    public courses: Observable<Array<Course>> = null;
    public hasMore: Observable<boolean> = null;

    private listChanged = new Subject<void>();
    private filters = new Subject<Filters>();
    private more = new Subject<void>();

    public constructor(
        @Inject(coursesServiceToken)
        private readonly coursesService: CoursesService,
        private readonly ngbModal: NgbModal
    ) {
    }

    public ngOnInit() {
        const paginationState: Observable<PaginationState<Course>> = this.filters
            .startWith(SearchPageComponent.initialFilters)
            // .combineLatest(this.listChanged, (filters, _) => {
            //     console.log('filters = ');
            //     console.log(filters);

            //     console.log('_ = ');
            //     console.log(_);

            //     return filters;
            // })
            .switchMap(filters => {

                const pagination = new PaginationMore({
                    query: filters,
                    pageSize: SearchPageComponent.pageSize,
                    fetch: defaultFetch((q: Filters, p: Page) => this.fetch(q, p)),
                    more: this.more
                });

                return pagination.paginationState;
            })
            .share();

        // now I need to extract courses and hasNext into separate observables
        this.courses = paginationState.map(state => state.items);
        this.hasMore = paginationState.map(state => state.hasMore);
    }

    public showMoreCourses(): void {
        this.more.next();
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
                        .subscribe(() => {
                            this.listChanged.next();
                        });
                }
            });

    }

    private filterChanged(filterText: string): void {
        this.filters.next({
            text: filterText
        });
    }

    private fetch(query: Filters, page: Page): Observable<Array<Course>> {

        // make service parameters
        const beginDate = new Date();
        beginDate.setDate(beginDate.getDate() - SearchPageComponent.daysInAdvance);

        return this.coursesService.searchCourses({
            text: query.text,
            beginDate,
            offset: page.skip,
            pageSize: page.take
        });
    }
}
