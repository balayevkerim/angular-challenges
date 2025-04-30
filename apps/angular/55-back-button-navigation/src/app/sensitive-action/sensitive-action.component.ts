import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { CanComponentDeactivate } from '../guards/back-button-override.guard';

@Component({
  imports: [MatButtonModule],
  selector: 'app-sensitive-action',
  templateUrl: './sensitive-action.component.html',
})
export class SensitiveActionComponent implements CanComponentDeactivate {
  readonly #dialog = inject(MatDialog);
  private dialogOpen = false;
  private destroy$ = new Subject<void>();
  private location = inject(Location);
  openDialog(): void {
    this.#dialog.open(DialogComponent, {
      width: '250px',
    });
    this.dialogOpen = true;
  }

  canDeactivate(): boolean {
    console.log('run', this.dialogOpen);
    if (this.dialogOpen) {
      this.#dialog.closeAll(); // Close the dialog
      return false; // Stay on the same page (prevent navigation)
    }
    return confirm('Do you really want to leave?'); // No dialog, allow navigation
  }

  private handleBackButton = () => {
    if (this.dialogOpen) {
      this.#dialog.closeAll();
      this.location.forward(); // << this moves forward back to the current page, avoiding extra push!
    }
  };

  ngOnDestroy() {
    window.removeEventListener('popstate', this.handleBackButton);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
