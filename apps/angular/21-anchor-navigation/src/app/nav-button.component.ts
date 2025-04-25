/* eslint-disable @angular-eslint/component-selector */
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'nav-button',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a
      [routerLink]="isFragmentLink ? null : href"
      [attr.href]="isFragmentLink ? href : null"
      (click)="handleClick($event)">
      <ng-content></ng-content>
    </a>
  `,
  host: {
    class: 'block w-fit border border-red-500 rounded-md p-4 m-2',
  },
})
export class NavButtonComponent {
  constructor(private router: Router) {}

  @Input() href = '';
  get isFragmentLink(): boolean {
    return this.href.startsWith('#');
  }

  handleClick(event: MouseEvent) {
    if (this.isFragmentLink) {
      event.preventDefault();
      const fragment = this.href.slice(1);
      const target = document.getElementById(fragment);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });

        // ✅ Attach fragment to current URL
        const currentPath = this.router.url.split('#')[0];
        const newUrl = `${currentPath}#${fragment}`;
        history.pushState(null, '', newUrl);
      }
    }
  }
}
