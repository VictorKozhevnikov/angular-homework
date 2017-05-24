import {
    Directive,
    HostBinding,
    HostListener,
    forwardRef,
    OnInit,
    OnDestroy,
    Input,
} from '@angular/core';
import {
    ControlValueAccessor,
    Validator,
    AbstractControl,
    ValidationErrors,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS
} from '@angular/forms';

import { Observable, Subject } from 'rxjs/Rx';

import * as moment from 'moment';

const myDateValueAccessor = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MyDateInputDirective),
    multi: true
};

@Directive({
    selector: 'input[myDateInput]',
    providers: [myDateValueAccessor]
})
export class MyDateInputDirective implements ControlValueAccessor, OnInit, OnDestroy {
    private static readonly defaultDateFormat: string = 'MM/DD/YYYY';

    @HostBinding('value')
    public dateString: String = null;

    @Input()
    public dateFormat: string = MyDateInputDirective.defaultDateFormat;


    private value = new Subject<string>();
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    public constructor() {
    }

    public ngOnInit(): void {
        this.value
            .map(valueString => moment(valueString, this.dateFormat, true))
            .map(valueMoment => valueMoment.isValid
                ? valueMoment.toDate()
                : null)
            .takeUntil(this.ngUnsubscribe)
            .subscribe(date => {
                this.onChange(date);
            });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    @HostListener('input', ['$event'])
    public manualDateChange($event: any) {
        const elementValue: string = $event.target.value;
        this.value.next(elementValue);
    }

    @HostListener('blur')
    public onblur() {
        this.onTouched();
    }

    public writeValue(obj: any): void {
        const m = moment(obj);
        if (m.isValid()) {
            this.dateString = m.format(this.dateFormat);
        }
    }

    public registerOnChange(fn: any): void { this.onChange = fn; }
    public registerOnTouched(fn: any): void { this.onTouched = fn; }

    private onChange = (_: any) => { };
    private onTouched = () => { };
}
