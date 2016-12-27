import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './users/login.component';
import { RegisterComponent } from './register/register.component';
import { PlayerComponent } from './players/player.component';
import { PlayerDetailComponent } from './players/player-detail.component';
import { PlayerCreateComponent } from './players/player-create.component';

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
    },
    {
        path: 'player',
        component: PlayerComponent
    },
    {
        path: 'player/detail/:playerID',
        component: PlayerDetailComponent
    },
    {
        path: 'player/new',
        component: PlayerCreateComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
    routes,
    {
        useHash: true
    }
);
