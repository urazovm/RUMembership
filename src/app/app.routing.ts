import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './users/login.component';
import { RegisterComponent } from './users/register.component';
import { UnauthenticatedGuard } from './unauthenticated.guard';

const routes: Route[] = [
    {
        path: '', pathMatch: 'full', redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [UnauthenticatedGuard]
    }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);
