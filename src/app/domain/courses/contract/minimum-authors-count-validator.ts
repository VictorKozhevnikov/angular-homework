import { AbstractControl } from '@angular/forms';

import { CourseAuthor } from './course-author';

export function minimumAuthorsCountValidator(
    minimumAuthorsCount: number
): (formControl: AbstractControl) => { [key: string]: any } {

    function validateMinimumAuthorsCount(formControl: AbstractControl): { [key: string]: any } {

        const courseAuthors: Array<CourseAuthor> = formControl.value;

        const isValid: boolean =
            minimumAuthorsCount === 0
            || (minimumAuthorsCount > 0
                && courseAuthors
                && courseAuthors.length >= minimumAuthorsCount);

        return isValid
            ? null
            : { minimumAuthorsCount };
    }

    return validateMinimumAuthorsCount;
}
