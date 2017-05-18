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

        const filters = this.filters
            .startWith('')
            .debounceTime(500)
            .map(text => text.trim())
            .distinctUntilChanged();

        this.courses = filters
            .switchMap(text => {

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

                const data = pagination
                    .map(page => {
                        // make service parameters
                        const beginDate = new Date();
                        beginDate.setDate(beginDate.getDate() - numberOfDays);

                        return this.coursesService.searchCourses({
                            text,
                            beginDate,
                            offset: page.skip,
                            pageSize: page.take
                        });
                    })
                    .concatAll()
                    .scan((currentItems, newItems) => currentItems.concat(newItems), []);

                return data.takeUntil(this.filters);
            });
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
