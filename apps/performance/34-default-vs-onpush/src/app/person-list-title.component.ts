import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-person-list-title',
  standalone: true,
  imports: [CDFlashingDirective, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 cd-flash class="text-center font-semibold" title="Title">
      {{ title | titlecase }}
    </h1>
  `,
})
export class PersonListTitleComponent {
  @Input() title = '';
}
