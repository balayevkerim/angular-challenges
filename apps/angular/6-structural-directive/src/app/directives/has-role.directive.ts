import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Role } from '../user.model';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRole]',
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef);

  private viewContainerRef = inject(ViewContainerRef);
  private userStore = inject(UserStore);
  @Input({ required: true }) hasRole!: Role | Role[] | any;

  ngOnInit(): void {
    this.userStore.user$.subscribe((user) => {
      this.viewContainerRef.clear();
      let hasRoles;
      if (Array.isArray(this.hasRole)) {
        hasRoles = this.hasRole.every((role) => user?.roles.includes(role));
      } else {
        hasRoles = user?.roles.includes(this.hasRole);
      }
      if (hasRoles || user?.isAdmin) {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
          // Create the embedded view with a context object that contains
          // the data via the key `$implicit`.
          $implicit: this.hasRole,
        });
      }
    });
  }
}
