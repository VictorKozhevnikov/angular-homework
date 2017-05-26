import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputAuthorsComponent } from './input-authors.component';

@NgModule({
    declarations: [InputAuthorsComponent],
    imports: [CommonModule],
    exports: [InputAuthorsComponent],
})
export class InputAuthorsModule {
    constructor() { }
}
