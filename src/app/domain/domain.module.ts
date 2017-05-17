import { NgModule } from '@angular/core';

import { HttpAuthModule } from './auth';
import { OfflineCoursesModule } from './courses';

@NgModule({
    declarations: [],
    imports: [
        HttpAuthModule,
        OfflineCoursesModule
    ],
    exports: [],
    entryComponents: []
})
export class DomainModule {
    constructor() { }
}
