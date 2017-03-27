import { NgModule } from '@angular/core';
import { SearchPageComponent } from './search-page.component';
import { CoursesListModule } from './courses-list';
import { ToolboxModule } from './toolbox';
import { OfflineCoursesModule } from '../../../domain/courses/implementation/offline';

@NgModule({
    declarations: [SearchPageComponent],
    imports: [CoursesListModule, ToolboxModule, OfflineCoursesModule],
    exports: [SearchPageComponent]
})
export class SearchPageModule {
    constructor() { }
}

