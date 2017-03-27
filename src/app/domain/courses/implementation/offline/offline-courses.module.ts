import { NgModule } from '@angular/core';
import { OfflineCoursesService } from './offline-courses.service';
import { OfflineCoureseRepository } from './offline-courses.repository';
import { coursesServiceToken } from '../../contract';


@NgModule({
    declarations: [],
    imports: [],
    exports: [],
    providers: [
        {provide: coursesServiceToken, useClass: OfflineCoursesService },
        OfflineCoureseRepository]
})
export class OfflineCoursesModule {
    constructor() { }
}
