import { NgModule } from '@angular/core';

import { DummyWorkModule } from './dummy-work';
import { MyDateInputModule } from './input/date';

@NgModule({
    declarations: [],
    imports: [
        DummyWorkModule,
        MyDateInputModule],
    exports: [
        DummyWorkModule,
        MyDateInputModule],
    providers: []
})
export class CoreModule {
    constructor() { }
}
