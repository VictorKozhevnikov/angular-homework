import { NgModule } from '@angular/core';

import { MyDateInputDirective } from './my-date-input.directive';

@NgModule({
    declarations: [ MyDateInputDirective ],
    imports: [],
    exports: [ MyDateInputDirective ],
})
export class MyDateInputModule {
    constructor() { }
}
