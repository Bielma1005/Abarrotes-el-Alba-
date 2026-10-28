import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  {
    path: 'productos',
    loadComponent: () =>
      import('./features/productos/pages/productos-page/productos-page').then(
        (m) => m.ProductosPage
      ),
  },
  { path: '**', redirectTo: 'productos' },
];
