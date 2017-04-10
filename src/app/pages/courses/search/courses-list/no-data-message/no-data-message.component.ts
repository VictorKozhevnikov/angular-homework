import { Component } from '@angular/core';

@Component({
    selector: 'no-data-message',
    template: `
        <div class="alert alert-info text-center" role="alert">
            <h4>No data.</h4>
            <div>Feel free to add new course.</div>
        </div>`
})
export class NoDataMessageComponent {

}
