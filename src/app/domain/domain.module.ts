import { NgModule } from '@angular/core';

import { OfflineAuthModule } from './auth';
import { OfflineCoursesModule } from './courses';

@NgModule({
    declarations: [],
    imports: [
        OfflineAuthModule,
        OfflineCoursesModule
    ],
    exports: [],
    entryComponents: []
})
export class DomainModule {
    constructor() { }
}
