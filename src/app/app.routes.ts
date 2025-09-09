import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        // redirectTo: '/home',
        // pathMatch: 'full'
    },
    // {
    //     path: 'home',
    //     loadComponent: () => import('./pages/home/home').then(c => c.Home)
    // }
    {
        path: '**',
        redirectTo: '',
    }
];