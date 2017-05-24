import { NgModule } from '@angular/core';

import { MyIntegerInputDirective } from './my-integer-input.directive';

@NgModule({
    declarations: [ MyIntegerInputDirective ],
    imports: [],
    exports: [ MyIntegerInputDirective ],
})
export class MyIntegerInputModule {
    constructor() { }
}
