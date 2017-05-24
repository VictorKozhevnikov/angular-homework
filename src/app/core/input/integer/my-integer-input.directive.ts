import {
    Directive,
    HostBinding,
    HostListener,
    forwardRef,
    OnInit,
    OnDestroy,
    Input,
    ElementRef
} from '@angular/core';
import {
    ControlValueAccessor,
    Validator,
    AbstractControl,
    ValidationErrors,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS
} from '@angular/forms';

import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';

const myIntegerValueAccessor = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MyIntegerInputDirective),
    multi: true
};

const myIntegerValidator = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => MyIntegerInputDirective),
    multi: true
};

@Directive({
    selector: 'input[myIntegerInput]',
    providers: [myIntegerValueAccessor, myIntegerValidator]
})
export class MyIntegerInputDirective implements ControlValueAccessor, Validator, OnInit, OnDestroy {
    // a small cheat here. True integer can be negative
    // for current application allow only positive integers
    private static integerRegex: RegExp = /^\d+$/;

    @HostBinding('value')
    public numberString: String = null;

    private value = new Subject<string>();
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private isValid: boolean = false;

    public ngOnInit(): void {
        this.value
            .map(valueString => {
                const isAValidInteger = MyIntegerInputDirective.integerRegex.test(valueString);
                return {
                    isValid: valueString.length === 0 || isAValidInteger,
                    parsedValue: isAValidInteger ? parseInt(valueString, 10) : null
                };
            })
            .takeUntil(this.ngUnsubscribe)
            .subscribe(result => {
                this.isValid = result.isValid;
                this.onChange(result.parsedValue);
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
        this.numberString = obj.toString();
        this.isValid = true;
    }

    public registerOnChange(fn: any): void { this.onChange = fn; }
    public registerOnTouched(fn: any): void { this.onTouched = fn; }

    public validate(control: AbstractControl): { [key: string]: any } {
        const value = control.value;

        return this.isValid
            ? null
            : { myInteger: true };
    };

    private onChange = (_: any) => { };
    private onTouched = () => { };
}
