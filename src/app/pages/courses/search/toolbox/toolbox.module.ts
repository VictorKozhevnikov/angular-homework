import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToolboxComponent } from './toolbox.component';

@NgModule({
    declarations: [ToolboxComponent],
    imports: [
        RouterModule.forChild([]),
        FormsModule],
    exports: [ToolboxComponent]
})
export class ToolboxModule {
    constructor() { }
}
