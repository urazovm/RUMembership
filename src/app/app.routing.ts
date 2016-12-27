import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './users/login.component';
import { RegisterComponent } from './users/register.component';

const routes: Route[] = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);
