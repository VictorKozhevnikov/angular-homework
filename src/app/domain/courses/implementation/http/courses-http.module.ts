import { NgModule } from '@angular/core';

import { coursesServiceToken } from '../../contract';

import { CoursesHttpService } from './courses-http.service';


@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        {provide: coursesServiceToken, useClass: CoursesHttpService }]
})
export class CoursesHttpModule {
    constructor() { }
}
