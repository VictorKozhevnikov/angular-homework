import { NgModule } from '@angular/core';

import { DummyWorkModule } from './dummy-work';

@NgModule({
    declarations: [],
    imports: [DummyWorkModule],
    exports: [DummyWorkModule],
    providers: [ ]
})
export class CoreModule {
    constructor() { }
}
