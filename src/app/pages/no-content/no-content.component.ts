import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  template: `
    <div class="jumbotron text-center">
      <h1>404: page missing</h1>
    </div>
  `,
  styles: ['.jumbotron{ background: none; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoContentComponent {

}
