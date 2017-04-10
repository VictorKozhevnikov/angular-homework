import { Component } from '@angular/core';

@Component({
    selector: 'no-data-message',
    template: `
        <div class="alert alert-info text-center" role="alert">
            <strong>No data.</strong>
            Feel free to add new course.
        </div>`
})
export class NoDataMessageComponent {

}
