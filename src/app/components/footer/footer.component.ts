import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'courses-footer',
  template: require('./footer.component.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
};
