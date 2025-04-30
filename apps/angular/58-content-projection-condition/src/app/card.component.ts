import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="small(); else largeView">
      <ng-content select="[title]" />
      <ng-content select="[message]" />
    </ng-container>

    <ng-template #largeView>
      <div class="p-4">
        <div class="text-2xl">
          <ng-content select="[title]" />
        </div>
        <ng-content select="[message]" />
      </div>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'p-4 border border-grey rounded-sm flex flex-col w-[200px]',
  },
})
export class CardComponent {
  small = input<boolean>(false);
}
