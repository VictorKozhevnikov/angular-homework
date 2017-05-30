import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BreadcrumbsModule } from './breadcrumbs';

import { HeaderComponent } from './header.component';


@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        BreadcrumbsModule],
    exports: [HeaderComponent]
})
export class HeaderModule {
    constructor() {
    }
}
