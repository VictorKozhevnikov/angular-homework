import { NgModule } from '@angular/core';

import { HttpAuthModule } from './auth';
import { UsersHttpModule } from './users';
import { CoursesHttpModule } from './courses';
import { AuthorizedHttpModule } from './http';

@NgModule({
    declarations: [],
    imports: [
        HttpAuthModule,
        UsersHttpModule,
        CoursesHttpModule,
        AuthorizedHttpModule
    ],
    exports: [
        HttpAuthModule,
        UsersHttpModule,
        CoursesHttpModule,
        AuthorizedHttpModule
    ],
    entryComponents: []
})
export class DomainModule {
    constructor() { }
}
