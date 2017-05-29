import { NgModule } from '@angular/core';

import { DummyWorkModule } from './dummy-work';
import { MyDateInputModule } from './input/date';
import { MyIntegerInputModule } from './input/integer';

@NgModule({
    declarations: [],
    imports: [
        DummyWorkModule,
        MyDateInputModule,
        MyIntegerInputModule],
    exports: [
        DummyWorkModule,
        MyDateInputModule,
        MyIntegerInputModule],
    providers: []
})
export class CoreModule {
    constructor() { }
}
