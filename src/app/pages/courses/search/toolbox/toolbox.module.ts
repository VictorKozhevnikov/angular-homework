import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToolboxComponent } from './toolbox.component';

@NgModule({
    declarations: [ToolboxComponent],
    imports: [FormsModule],
    exports: [ToolboxComponent]
})
export class ToolboxModule {
    constructor() { }
}
