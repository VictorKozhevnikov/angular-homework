import { NgModule } from '@angular/core';

import { HttpAuthModule } from './auth';
import { UsersHttpModule } from './users';
import { CoursesHttpModule } from './courses';

@NgModule({
    declarations: [],
    imports: [
        HttpAuthModule,
        UsersHttpModule,
        CoursesHttpModule
    ],
    exports: [
        HttpAuthModule,
        UsersHttpModule,
        CoursesHttpModule
    ],
    entryComponents: []
})
export class DomainModule {
    constructor() { }
}
