import {
    Component,
    ChangeDetectionStrategy,
    forwardRef,
    OnInit,
    OnDestroy,
} from '@angular/core';

import {
    FormBuilder,
    FormGroup,
    Validators,
    NG_VALUE_ACCESSOR,
    ControlValueAccessor
} from '@angular/forms';

import { Subject } from 'rxjs/Rx';

import { CourseData, minimumAuthorsCountValidator } from '../../../../domain/courses';

const valueAccessor = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputCourseDataComponent),
    multi: true
};

@Component({
    selector: 'input-course-data',
    templateUrl: './input-course-data.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCourseDataComponent implements ControlValueAccessor, OnInit, OnDestroy {
    public readonly dateFormat: string = 'MM/DD/YYYY';
    public courseForm: FormGroup;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public constructor(
        private readonly formBuilder: FormBuilder
    ) {
    }

    public ngOnInit(): void {
        this.courseForm = this.formBuilder.group({
            title: ['', [Validators.required, Validators.maxLength(50)]],
            isTopRated: [false, Validators.required],
            description: ['', [Validators.required, Validators.maxLength(500)]],
            beginTime: [new Date(), Validators.required],
            duration: [0, Validators.required],
            authors: [[], minimumAuthorsCountValidator(1)]
        });

        this.courseForm.valueChanges
            .takeUntil(this.ngUnsubscribe)
            .subscribe(value => {
                this.onChange(value);
            });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public touch(){
        console.log('---- touched');
        this.onTouched();
    }

    public writeValue(courseData: CourseData): void {
        this.courseForm.setValue(courseData);
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
