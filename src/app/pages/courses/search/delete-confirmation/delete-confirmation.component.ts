import {
    Component,
    Input,
    ChangeDetectionStrategy
} from '@angular/core';
import { Course } from '../../../../domain/courses/contract';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    // no selector, because the component is loaded by type
    template: require('./delete-confirmation.component.html'),
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteConfirmationComponent {
    @Input() public course: Course;

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
