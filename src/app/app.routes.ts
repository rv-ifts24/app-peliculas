import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'detalle/:id',
        loadComponent: () =>
            import('./pages/detalle/detalle.component')
                .then((m) => m.DetalleComponent)
    },
    {
        path: '',
        loadComponent: () =>
            import('./features/home/home.component')
                .then((m) => m.HomeComponent)
    },
    { path: '**', redirectTo: '/home' }
];
