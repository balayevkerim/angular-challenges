import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

@Component({
  imports: [NgIf, AsyncPipe],
  selector: 'app-root',
  template: `
    <div>Top</div>
    <div>Middle</div>
    <div>Bottom</div>
    <button (click)="goToTop()" *ngIf="displayButton$ | async">Top</button>
  `,
  styles: [
    `
      :host {
        height: 1500px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        button {
          position: fixed;
          bottom: 1rem;
          left: 1rem;
          z-index: 1;
          padding: 1rem;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'scroll-cd';

  private displayButtonSubject = new BehaviorSubject<boolean>(false);
  displayButton$ = this.displayButtonSubject.asObservable();
  private lastState = false;
  private ngZone = inject(NgZone);

  /* @HostListener('window:scroll', ['$event'])
  onScroll() {
    const pos = window.pageYOffset;
    const shouldDisplay = pos > 50;
    // Only update and trigger change detection if the visibility changed
    if (shouldDisplay !== this.lastState) {
      this.lastState = shouldDisplay;
      this.displayButtonSubject.next(shouldDisplay);

      // Manually mark this component to check for update
      this.cdr.markForCheck();
    }
  } */
  constructor() {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'scroll').subscribe(() => {
        const shouldShow = window.pageYOffset > 50;

        if (this.lastState !== shouldShow) {
          this.lastState = shouldShow;
          this.displayButtonSubject.next(shouldShow);
        }
      });
    });
  }

  goToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
