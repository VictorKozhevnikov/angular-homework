import { NgModule } from '@angular/core';

import { DummyWorkModule } from './dummy-work';
import { ProfilingModule } from './profiling';

@NgModule({
    declarations: [],
    imports: [DummyWorkModule, ProfilingModule],
    exports: [],
    providers: [ ]
})
export class CoreModule {
    constructor() { }
}
