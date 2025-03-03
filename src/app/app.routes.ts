import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guards';

export const routes: Routes = [
  {
    path: 'networking',
    loadChildren: () =>
      import('./features/networking/networking.routes').then(
        (m) => m.NETWORKING_ROUTES
      ),
  },
  {
    path: 'marketplace',
    loadChildren: () =>
      import('./features/marketplace/marketplace.routes').then(
        (m) => m.MARKETPLACE_ROUTES
      ),
  },
  {
    path: 'lead-generation',
    loadChildren: () =>
      import('./features/lead-generation/lead-generation.routes').then(
        (m) => m.LEAD_ROUTES
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.routes').then(
        (m) => m.DASHBOARD_ROUTES
      ),
  },
  {
    path: 'landing',
    loadChildren: () =>
      import('./features/landing/landing.routes').then(
        (m) => m.LANDING_ROUTES
      ),
    canActivate: [AuthGuard], // Protect the landing page
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login' },
];
