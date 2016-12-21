import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Route[] = [
    {
        path: '', pathMatch: 'full', redirectTo: 'dashboard'
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);