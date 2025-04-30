import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ListDirective, PersonDirective } from './directives';
import { ListComponent } from './list.component';
import { PersonComponent } from './person.component';

@Component({
  imports: [PersonComponent, ListComponent, PersonDirective, ListDirective],
  selector: 'app-root',
  template: `
    <person [person]="person">
      <ng-template #personRef person let-name let-age>
        {{ name }}: {{ age }}
      </ng-template>
    </person>

    <list [list]="students">
      <ng-template #listRef person let-student let-i="index">
        {{ student.name }}: {{ student.age }} - {{ i }}
      </ng-template>
    </list>

    <list [list]="cities">
      <ng-template #listRef list let-city let-i="index">
        {{ city.name }}: {{ city.country }} - {{ i }}
      </ng-template>
    </list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  person = {
    name: 'toto',
    age: 3,
  };

  students = [
    { name: 'toto', age: 3 },
    { name: 'titi', age: 4 },
  ];

  cities = [
    { name: 'Paris', country: 'France' },
    { name: 'Berlin', country: 'Germany' },
  ];
}
