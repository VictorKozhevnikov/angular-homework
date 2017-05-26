import {
    Component,
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'input-course-data',
    templateUrl: './input-course-data.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCourseDataComponent {
    public constructor() {

    }
}
