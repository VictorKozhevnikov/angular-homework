import {
    Component,
    Output,
    EventEmitter,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    OnInit,
    OnDestroy,
    Inject,
    forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs/Rx';

import { CoursesService, coursesServiceToken, CourseAuthor } from '../../../domain/courses';

const valueAccessor = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputAuthorsComponent),
    multi: true
};

@Component({
    selector: 'input-authors',
    templateUrl: './input-authors.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [valueAccessor]
})
export class InputAuthorsComponent implements ControlValueAccessor, OnInit, OnDestroy {
    @Output() public touched = new EventEmitter<void>();
    public selectedAuthors: Array<CourseAuthor> = [];
    public allAuthors: Observable<Array<CourseAuthor>> = null;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public constructor(
        @Inject(coursesServiceToken)
        private readonly coursesService: CoursesService,
        private readonly changeDetector: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
        this.allAuthors = this.coursesService.searchCourseAuthors();
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public authorIsSelected(courseAuthor: CourseAuthor): boolean {
        return this.selectedAuthors.some(author => author.id === courseAuthor.id);
    }

    public toggleAuthor(courseAuthor: CourseAuthor, include: boolean): void {
        const authorIndex: number = this.selectedAuthors
            .findIndex(author => author.id === courseAuthor.id);

        const alreadyIncluded: boolean = authorIndex >= 0;

        if (include && !alreadyIncluded) {
            this.selectedAuthors.push(courseAuthor);
            this.onChange(this.selectedAuthors);
        } else if (!include && alreadyIncluded) {
            this.selectedAuthors.splice(authorIndex, 1);
            this.onChange(this.selectedAuthors);
        }
    }

    public touch() {
        this.onTouched();
        this.touched.emit();
    }

    public writeValue(obj: any): void {
        // assuming obj is array of CourseAuthor
        const newSelectedAuthors: Array<CourseAuthor> = obj;

        this.selectedAuthors = newSelectedAuthors;
        this.changeDetector.markForCheck();
        this.onChange(this.selectedAuthors);
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    private onChange = (_: any) => { };
    private onTouched = () => { };
}
