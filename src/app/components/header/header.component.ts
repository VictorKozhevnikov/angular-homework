import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'courses-header',
    template: require('./header.component.html')
})
export class HeaderComponent {

    @Output() public logoutRequested = new EventEmitter();

    private logout() {
        this.logoutRequested.emit();
    }

};
