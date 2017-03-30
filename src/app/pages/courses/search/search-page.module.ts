import { NgModule } from '@angular/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SearchPageComponent } from './search-page.component';
import { CoursesListModule } from './courses-list';
import { ToolboxModule } from './toolbox';
import { OfflineCoursesModule } from '../../../domain/courses/implementation/offline';
import { DeleteConfirmationComponent } from './delete-confirmation';


@NgModule({
    declarations: [
        SearchPageComponent, DeleteConfirmationComponent],
    imports: [
        CoursesListModule,
        ToolboxModule,
        OfflineCoursesModule,
        NgbModule.forRoot()],
    exports: [
        SearchPageComponent],
    entryComponents: [
        DeleteConfirmationComponent]
})
export class SearchPageModule {
    constructor() { }
}

