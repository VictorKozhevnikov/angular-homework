import { AbstractControl } from '@angular/forms';
import * as moment from 'moment';

export function dateValidator(
    dateFormat: string
): (control: AbstractControl) => { [key: string]: any } {

    function validateDateFormat(control: AbstractControl): { [key: string]: any } {
        const m = moment(control.value, dateFormat);
        return m.isValid()
            ? null
            : { date: {requiredFormat: dateFormat} };
    }

    return validateDateFormat;
}
