import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ForWithEmptyDirective } from './for-with-empty.directive';

interface Person {
  name: string;
}

@Component({
  imports: [NgFor, NgIf, ForWithEmptyDirective],
  selector: 'app-root',
  template: `
    <div *forWithEmpty="let person of persons; empty: emptyList">
      {{ person.name }}
    </div>

    <ng-template #emptyList>The list is empty !!</ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: Person[] = [];
}
