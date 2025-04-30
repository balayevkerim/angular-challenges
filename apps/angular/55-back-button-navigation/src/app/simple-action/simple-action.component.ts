import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { CanComponentDeactivate } from '../guards/back-button-override.guard';

@Component({
  imports: [MatButtonModule],
  selector: 'app-simple-action',
  templateUrl: './simple-action.component.html',
})
export class SimpleActionComponent implements CanComponentDeactivate {
  readonly #dialog = inject(MatDialog);
  private dialogOpen = false;
  private destroy$ = new Subject<void>();

  openDialog(): void {
    const dialogRef = this.#dialog.open(DialogComponent, {
      width: '250px',
    });
    this.dialogOpen = true;
    console.log(this.dialogOpen);
  }
  constructor() {
    window.addEventListener('popstate', this.handleBackButton);
  }

  canDeactivate(): boolean {
    console.log('run', this.dialogOpen);
    if (this.dialogOpen) {
      this.#dialog.closeAll(); // Close the dialog
      history.pushState(null, ''); // Cancel the back navigation (trick!)
      return false; // Stay on the same page (prevent navigation)
    }
    return true; // No dialog, allow navigation
  }

  private handleBackButton = () => {
    if (this.dialogOpen) {
      this.#dialog.closeAll();
      history.pushState(null, ''); // Push again to stay
    }
  };

  ngOnDestroy() {
    window.removeEventListener('popstate', this.handleBackButton);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
