import { NgModule } from '@angular/core';
import { SearchPageComponent } from './search-page.component';
import { CoursesListModule } from './courses-list';

@NgModule({
    declarations: [SearchPageComponent],
    imports: [CoursesListModule],
    exports: [SearchPageComponent]
})
export class SearchPageModule {
    constructor() { }
}
