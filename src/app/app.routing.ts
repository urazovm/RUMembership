import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './users/login.component';

const routes: Route[] = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);
