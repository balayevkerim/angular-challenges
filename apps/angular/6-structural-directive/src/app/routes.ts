import { inject } from '@angular/core';
import { map } from 'rxjs';
import { admin, manager, Role } from './user.model';
import { UserStore } from './user.store';

const canMatchRoles = (requiredRoles: Role[], requiredAdmin = false) => {
  const userStore = inject(UserStore);
  return userStore.user$.pipe(
    map((user) => {
      console.log('user, user', user);
      if (!user) return false;
      if (requiredAdmin) return user.isAdmin;
      return requiredRoles.every((role) => user.roles.includes(role));
    }),
  );
};

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
    canMatch: [() => canMatchRoles(admin.roles, true)],
  },
  {
    path: 'enter',
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
    canMatch: [() => canMatchRoles(manager.roles)],
  },
];
