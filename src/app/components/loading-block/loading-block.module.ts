import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingBlockComponent } from './loading-block.component';
import { LoadingBlockService } from  './loading-block.service';

@NgModule({
    declarations: [LoadingBlockComponent],
    imports: [CommonModule],
    exports: [LoadingBlockComponent],
    providers: [LoadingBlockService]
})
export class LoadingBlockModule {
    constructor() { }
}
