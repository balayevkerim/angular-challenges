import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-person-list-item',
  standalone: true,
  imports: [MatListItem, CDFlashingDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-list-item cd-flash class="text-orange-500">
      <div MatListItemLine class="flex justify-between">
        <h3 title="Name">
          {{ name }}
        </h3>
      </div>
    </mat-list-item>
  `,
})
export class PersonListItemComponent {
  @Input() name = '';
}
