import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    // no selector, because the component is loaded by type
    template: require('./delete-confirmation.component.html')
})
export class DeleteConfirmationComponent {
    private readonly modal: NgbActiveModal;

    public constructor(modal: NgbActiveModal) {
        this.modal = modal;
    }

    private confirm() {
        this.modal.close(true);
    }

    private cancel() {
        this.modal.close(false);
    }
}
