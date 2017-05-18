import { NgModule } from '@angular/core';

import { HttpAuthModule } from './auth';
import { UsersHttpModule } from './users';
import { OfflineCoursesModule } from './courses';

@NgModule({
    declarations: [],
    imports: [
        HttpAuthModule,
        UsersHttpModule,
        OfflineCoursesModule
    ],
    exports: [
        HttpAuthModule,
        UsersHttpModule,
        OfflineCoursesModule
    ],
    entryComponents: []
})
export class DomainModule {
    constructor() { }
}
