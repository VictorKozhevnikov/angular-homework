import { Component, Output, OnInit, Inject, EventEmitter } from '@angular/core';

import { Subject, Observable } from 'rxjs/Rx';

import { Course, CoursesService, coursesServiceToken } from '../../../domain/courses/contract';
import { DeleteConfirmationComponent } from './delete-confirmation';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'courses-search-page',
    template: require('./search-page.component.html')
})
export class SearchPageComponent implements OnInit {
    @Output() public addCourseRequested: EventEmitter<void> = new EventEmitter<void>();
    public courses: Observable<Array<Course>>;
    public hasMore: Observable<boolean>;

    private listChanged: Subject<void> = new Subject<void>();
    private filters: Subject<string> = new Subject<string>();
    private more: Subject<void> = new Subject<void>();

    public constructor(
        @Inject(coursesServiceToken)
        private readonly coursesService: CoursesService,
        private readonly ngbModal: NgbModal
    ) {
    }

    public ngOnInit() {
        const numberOfDays = 14;
        const pageSize = 5;

        const beginLoading = new Subject<void>();
        const endLoading = new Subject<void>();
        const coursesService = this.coursesService;

        const filters = this.filters
            .startWith('')
            .debounceTime(300)
            .map(text => text.trim())
            .distinctUntilChanged();

        const pagination = this.more
            .startWith(null)
            .map(() => pageSize)
            .scan(
            (page, numberOfItems) => {
                page.skip += page.take;
                page.take = numberOfItems;
                return page;
            },
            { skip: 0, take: 0 });

        function fetch(args: {
            query: {
                text: string;
            };
            page: {
                skip: number;
                take: number;
            }
        }): Observable<{
            courses: Array<Course>;
            hasNext: boolean;
        }> {
            // make service parameters
            const beginDate = new Date();
            beginDate.setDate(beginDate.getDate() - numberOfDays);

            return coursesService
                .searchCourses({
                    text: args.query.text,
                    beginDate,
                    offset: args.page.skip,
                    pageSize: args.page.take + 1
                })
                .map(courses => {
                    const hasNext = courses.length > args.page.take;
                    courses.pop();
                    return {
                        courses,
                        hasNext
                    };
                });
        }

        const paginationState = filters
            .switchMap(text => {

                return pagination
                    .map(page => fetch({ query: { text }, page }))
                    .concatAll()
                    .scan(
                    (state, fetchResult) => {
                        state.items = state.items.concat(fetchResult.courses);
                        state.hasNext = fetchResult.hasNext;
                        return state;
                    },
                    {
                        items: [],
                        hasNext: false
                    });
            })
            .share();

        // now I need to extract courses and hasNext into separate observables
        this.courses = paginationState.map(state => state.items);
        this.hasMore = paginationState.map(state => state.hasNext);
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
                        .subscribe(() => this.listChanged.next());
                }
            });

    }

    private filterChanged(filterText: string): void {
        this.filters.next(filterText);
    }
}
