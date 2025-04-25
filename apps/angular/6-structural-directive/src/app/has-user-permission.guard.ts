import { inject, Injectable } from '@angular/core';
import { CanMatch, Route, Router } from '@angular/router';
import { Role } from './user.model';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class HasPermissionGuard implements CanMatch {
  private router = inject(Router);
  private userStore = inject(UserStore);

  canMatch(route: Route): boolean {
    const accessRolesList: Role[] = route.data?.['roles'] ?? [];
    const isAdmin: boolean = route.data?.['isAdmin'] ?? false;

    return false;
  }
}
