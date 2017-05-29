import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: '',
  template: `
    <div class="jumbotron text-center">
      <h1>404: page missing</h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoContentComponent {

}
