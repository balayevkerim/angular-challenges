import {
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserStore } from '../user.store';

@Directive({
  selector: '[hasRoleSuperAdmin]',
})
export class HasRoleSuperAdminDirective {
  private templateRef = inject(TemplateRef);

  private viewContainerRef = inject(ViewContainerRef);
  private userStore = inject(UserStore);
  @Input() hasRoleSuperAdmin!: boolean;

  ngOnInit(): void {
    this.userStore.user$.subscribe((user) => {
      this.viewContainerRef.clear();

      if (user?.isAdmin) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
