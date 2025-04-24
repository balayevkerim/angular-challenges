import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from './card.component';
import { CardMessageDirective, CardTitleDirective } from './card.directive';

@Component({
  imports: [CardComponent, CardTitleDirective, CardMessageDirective],
  selector: 'app-root',
  template: `
    <app-card>
      <card-title>Titre 1</card-title>
      <card-message>Message1</card-message>
    </app-card>
    <app-card>
      <card-title>Titre 2</card-title>
    </app-card>
  `,
  host: {
    class: 'p-4 block flex flex-col gap-1',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
