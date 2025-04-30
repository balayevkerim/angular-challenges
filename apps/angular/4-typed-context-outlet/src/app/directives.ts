import { Directive } from '@angular/core';
import { Person } from './person.component';

interface PersonContext {
  $implicit: Person;
  index: number;
}

@Directive({
  selector: 'ng-template[person]',
  standalone: true,
})
export class PersonDirective {
  static ngTemplateContextGuard(
    dir: PersonDirective,
    ctx: unknown,
  ): ctx is PersonContext {
    return true;
  }
}

interface CityList {
  name: string;
  country: string;
}
interface ListContext {
  $implicit: CityList;
  index: number;
}

@Directive({
  selector: 'ng-template[list]',
  standalone: true,
})
export class ListDirective {
  static ngTemplateContextGuard(
    dir: ListDirective,
    ctx: unknown,
  ): ctx is ListContext {
    return true;
  }
}
