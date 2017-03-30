import { Component } from '@angular/core';

@Component({
    selector: 'toolbox',
    template: require('./toolbox.component.html'),
    styleUrls: [
        './toolbox.component.scss'
    ]
})
export class ToolboxComponent {
    private text: string;

    private search(text: string): void {
        console.log('---- search: ' + text + ', field value is ' + this.text);
    }
}
