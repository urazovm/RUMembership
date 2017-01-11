import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './users/login.component';
import { RegisterComponent } from './users/register.component';
import { UnauthenticatedGuard } from './unauthenticated.guard';

import { MainRoutes } from './main/main.routes';

import { MainComponent } from './main/main.component';

const routes: Route[] = [
    // {
    //     path: '', pathMatch: 'full', redirectTo: 'player'
    // },
    {
        path: 'login',
        component: LoginComponent//,
        // canActivate: [UnauthenticatedGuard]
    },
    {
        path: 'register',
        component: RegisterComponent//,
        // canActivate: [UnauthenticatedGuard]
    },
    ...MainRoutes
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);
