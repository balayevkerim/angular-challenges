import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { PersonFormComponent } from './form-input.component';
import { PersonListItemComponent } from './list-item';
import { PersonListTitleComponent } from './person-list-title.component';

@Component({
  selector: 'app-person-list',
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    PersonFormComponent,
    PersonListItemComponent,
    PersonListTitleComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-person-list-title [title]="title" />

    <app-person-form (submitted)="addName($event)" />

    <mat-list class="flex w-full">
      <div *ngIf="names?.length === 0" class="empty-list-label">Empty list</div>
      <app-person-list-item
        *ngFor="let name of names; trackBy: trackByUser"
        [name]="name"></app-person-list-item>
      <mat-divider *ngIf="names?.length !== 0"></mat-divider>
    </mat-list>
  `,
  host: {
    class: 'w-full flex flex-col items-center',
  },
})
export class PersonListComponent {
  @Input() names: string[] = [];
  @Input() title = '';

  // @Output() namesChange = new EventEmitter<string>();

  addName(name: string) {
    this.names = [name, ...this.names];
  }

  trackByUser(index: number, user: string) {
    return user;
  }
}
