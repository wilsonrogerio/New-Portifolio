import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', loadComponent: () => import('./components/inicial/inicial').then(c => c.Inicial) },
  { path: 'resumo', loadComponent: () => import('./components/resumo/resumo').then(c => c.Resumo) },
  { path: 'sobre', loadComponent: () => import('./components/sobre/sobre').then(c => c.Sobre) },
  { path: 'contato', loadComponent: () => import('./components/contato/contato').then(c => c.Contato) },
  { path: '**', redirectTo: '/inicio' },
];
